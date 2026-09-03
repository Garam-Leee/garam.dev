import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import next from "@next/eslint-plugin-next";

export default tseslint.config(
  // 기본 JS 권장 룰
  js.configs.recommended,

  // TypeScript 룰
  ...tseslint.configs.recommended,

  // Next.js + React Hooks
  {
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": next,
    },
    rules: {
      // React Hooks 룰
      ...reactHooks.configs.recommended.rules,

      // Next.js 권장 룰
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,

      // TypeScript 커스텀
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",

      // 일반
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
    },
  },

  // 전역 무시 패턴
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "public/**",
      "*.config.mjs",
      "*.config.ts",
      "postcss.config.mjs",
    ],
  }
);
