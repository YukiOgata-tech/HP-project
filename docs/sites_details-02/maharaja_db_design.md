# MAHARAJA NIGHT イベント管理システム DB設計（本格運用版）

## 全体方針

DBは以下の単位で分ける。

``` txt
events          イベント本体
venues          会場
floor_areas     フロア区画
tables          VIP卓・通常卓・個室
staff           スタッフ
products        商品
orders          注文伝票
order_items     注文明細
payments        会計記録
sales_credits   売上担当者記録
drink_tickets   1Dチケット消化記録
audit_logs      操作ログ
```

平面図構成よりVIPエリア、VIP個室、客席、ステージ、DJブース、バーカウンターが分かれているため、席管理は「座席」ではなく「エリア＋卓単位」が適切。

------------------------------------------------------------------------

# 1. events

イベント本体。

``` sql
events (
  id uuid primary key,
  name text not null,
  slug text unique not null,
  event_date date not null,
  start_at timestamptz,
  end_at timestamptz,
  venue_id uuid references venues(id),
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

------------------------------------------------------------------------

# 2. venues

会場情報。

``` sql
venues (
  id uuid primary key,
  name text not null,
  address text,
  memo text,
  created_at timestamptz default now()
)
```

例:

``` txt
NEXS NIIGATA
新潟市中央区万代1-3-1 万代シネモールビルB1
```

------------------------------------------------------------------------

# 3. floor_areas

会場内の区画。

``` sql
floor_areas (
  id uuid primary key,
  venue_id uuid references venues(id),
  name text not null,
  area_type text,
  display_order int default 0,
  memo text
)
```

例:

``` txt
VIPエリア
VIP個室
バーカウンター
客席
ステージ前
```

------------------------------------------------------------------------

# 4. tables

VIP卓・個室・通常卓。

``` sql
tables (
  id uuid primary key,
  event_id uuid references events(id),
  area_id uuid references floor_areas(id),
  name text not null,
  table_type text not null,
  capacity int,
  table_charge int default 0,
  time_limit_minutes int,
  status text default 'available',
  assigned_staff_id uuid references staff(id),
  memo text,
  display_order int default 0,
  created_at timestamptz default now()
)
```

例:

``` txt
VIP A：50,000円
VIP B：50,000円
VIP個室1：80,000円
```

------------------------------------------------------------------------

# 5. staff

``` sql
staff (
  id uuid primary key,
  event_id uuid references events(id),
  name text not null,
  display_name text,
  role text not null,
  phone text,
  is_active boolean default true,
  commission_rate numeric(5,2) default 0,
  memo text,
  created_at timestamptz default now()
)
```

role:

-   admin
-   cashier
-   bar
-   floor
-   vip
-   bottle_sales
-   viewer

------------------------------------------------------------------------

# 6. products

``` sql
products (
  id uuid primary key,
  event_id uuid references events(id),
  name text not null,
  category text not null,
  price int not null,
  cost int,
  is_active boolean default true,
  is_revenue boolean default true,
  is_bottle boolean default false,
  requires_sales_staff boolean default false,
  is_free_drink_eligible boolean default false,
  stock_quantity int,
  display_order int default 0,
  memo text,
  created_at timestamptz default now()
)
```

例:

``` txt
ビール              800円
ハイボール          800円
テキーラ            1000円
シャンパンA         30000円
シャンパンB         50000円
1D対象ドリンク       0円扱い
```

------------------------------------------------------------------------

# 7. orders

``` sql
orders (
  id uuid primary key,
  event_id uuid references events(id),
  table_id uuid references tables(id),
  order_type text not null,
  status text default 'open',
  payment_status text default 'unpaid',
  created_by_staff_id uuid references staff(id),
  sales_staff_id uuid references staff(id),
  subtotal int default 0,
  discount_amount int default 0,
  service_charge int default 0,
  total_amount int default 0,
  is_revenue boolean default true,
  memo text,
  created_at timestamptz default now(),
  closed_at timestamptz
)
```

------------------------------------------------------------------------

# 8. order_items

``` sql
order_items (
  id uuid primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  category text,
  unit_price int not null,
  quantity int not null,
  subtotal int not null,
  is_revenue boolean default true,
  sales_staff_id uuid references staff(id),
  status text default 'ordered',
  memo text,
  created_at timestamptz default now()
)
```

------------------------------------------------------------------------

# 9. payments

``` sql
payments (
  id uuid primary key,
  event_id uuid references events(id),
  table_id uuid references tables(id),
  order_id uuid references orders(id),
  amount int not null,
  payment_method text,
  status text default 'recorded',
  recorded_by_staff_id uuid references staff(id),
  memo text,
  created_at timestamptz default now()
)
```

------------------------------------------------------------------------

# 10. sales_credits

``` sql
sales_credits (
  id uuid primary key,
  event_id uuid references events(id),
  order_id uuid references orders(id),
  order_item_id uuid references order_items(id),
  staff_id uuid references staff(id),
  amount int not null,
  quantity int default 1,
  credit_type text default 'sale',
  created_at timestamptz default now()
)
```

例:

``` txt
Aさん：シャンパン3本 / 150,000円
Bさん：ボトル2本 / 80,000円
```

------------------------------------------------------------------------

# 11. drink_tickets

``` sql
drink_tickets (
  id uuid primary key,
  event_id uuid references events(id),
  ticket_code text,
  product_id uuid references products(id),
  used_by_staff_id uuid references staff(id),
  table_id uuid references tables(id),
  status text default 'used',
  used_at timestamptz default now(),
  memo text
)
```

------------------------------------------------------------------------

# 12. audit_logs

``` sql
audit_logs (
  id uuid primary key,
  event_id uuid references events(id),
  actor_staff_id uuid references staff(id),
  action text not null,
  target_table text,
  target_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz default now()
)
```

------------------------------------------------------------------------

# MVP

``` txt
events
venues
floor_areas
tables
staff
products
orders
order_items
payments
```

追加:

``` txt
sales_credits
drink_tickets
```

------------------------------------------------------------------------

# 実装上の最重要ポイント

固定実装は避ける。

悪い例:

``` txt
VIP席 = 固定5万円
シャンパン = 固定3万円
スタッフ = 固定メンバー
```

良い例:

``` txt
イベントごとに卓を作る
イベントごとに商品を作る
イベントごとに料金を変える
イベントごとにスタッフを登録する
```
