#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const name = process.argv[2];

if (!name) {
  console.error("使い方: pnpm create-app <アプリ名>");
  console.error("例:     pnpm create-app hair-salon02");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(name)) {
  console.error("アプリ名は小文字・数字・ハイフンのみ使えます");
  process.exit(1);
}

const appDir = resolve(ROOT, "apps", name);

if (existsSync(appDir)) {
  console.error(`apps/${name} はすでに存在します`);
  process.exit(1);
}

console.log(`\n📁 apps/${name} を作成中...\n`);

// ディレクトリ作成
mkdirSync(`${appDir}/app`, { recursive: true });
mkdirSync(`${appDir}/public`, { recursive: true });

// package.json
writeFileSync(`${appDir}/package.json`, JSON.stringify({
  name,
  version: "0.1.0",
  private: true,
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "eslint",
  },
  dependencies: {
    clsx: "^2.1.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.14.0",
    next: "16.2.4",
    react: "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.74.0",
    "react-intersection-observer": "^10.0.3",
    "tailwind-merge": "^3.5.0",
    zod: "^4.3.6",
  },
  devDependencies: {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    eslint: "^9",
    "eslint-config-next": "16.2.4",
    tailwindcss: "^4",
    typescript: "^5",
  },
}, null, 2) + "\n");

// next.config.ts
writeFileSync(`${appDir}/next.config.ts`, `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`);

// tsconfig.json
writeFileSync(`${appDir}/tsconfig.json`, JSON.stringify({
  compilerOptions: {
    target: "ES2017",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    incremental: true,
    plugins: [{ name: "next" }],
    paths: { "@/*": ["./*"] },
  },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  exclude: ["node_modules"],
}, null, 2) + "\n");

// postcss.config.mjs
writeFileSync(`${appDir}/postcss.config.mjs`, `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`);

// eslint.config.mjs
writeFileSync(`${appDir}/eslint.config.mjs`, `import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
`);

// app/globals.css
writeFileSync(`${appDir}/app/globals.css`, `@import "tailwindcss";
@source "../../../packages/components/src";
`);

// app/layout.tsx
writeFileSync(`${appDir}/app/layout.tsx`, `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${name}",
  description: "${name} website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
`);

// app/page.tsx
writeFileSync(`${appDir}/app/page.tsx`, `export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">${name}</h1>
    </main>
  );
}
`);

// pnpm install
console.log("📦 pnpm install を実行中...\n");
execSync("pnpm install", { cwd: ROOT, stdio: "inherit" });

console.log(`
✅ apps/${name} を作成しました！

開発サーバーの起動:
  pnpm --filter ${name} dev
`);
