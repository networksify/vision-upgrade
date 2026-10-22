import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      /*
       * Dashboard client components load their data in an effect and mirror the
       * result into state. That is a deliberate, contained pattern here: every
       * screen renders a loading state first, then swaps in the service result,
       * and the service layer is the only thing that touches a provider.
       *
       * Deriving the same state during render is not an option — it would start
       * requests while rendering — and mirroring it in an effect is exactly what
       * the rule flags. The rule stays enabled everywhere else (`src/lib`,
       * `src/hooks`, the public site) so genuine cascading-render bugs are still
       * caught.
       */
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
