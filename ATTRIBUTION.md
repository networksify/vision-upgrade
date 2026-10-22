# Attribution

The Vision Upgrade admin dashboard is built inside this repository and reuses
code from the [shadcn/ui](https://ui.shadcn.com) component registry.

## shadcn/ui

- **Project:** shadcn/ui — <https://github.com/shadcn-ui/ui>
- **Licence:** MIT
- **Version used:** `shadcn@4.22.1` (CLI), style `radix-nova` (v4 registry)
- **How it is used:** the CLI generated the primitives in
  `src/components/ui/` and the `src/hooks/use-mobile.ts` hook. The dashboard
  shell, header, navigation and sign-in screen are adaptations of the
  `sidebar-01`, `dashboard-01` and `login-01` blocks, re-skinned with the
  Vision Upgrade palette and wired to this project's service layer.
- **Local changes:** colour tokens were remapped to the brand palette in
  `src/app/globals.css`; `src/components/ui/sonner.tsx` pins the theme instead
  of reading `next-themes`; `src/hooks/use-mobile.ts` subscribes to its media
  query with `useSyncExternalStore` instead of mirroring it into state. The
  custom-variant and scrollbar utilities from the upstream `shadcn` package's
  `tailwind.css` are vendored at the top of `src/app/globals.css` so the CLI
  package does not have to be a runtime dependency.

### MIT Licence

```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Runtime dependencies added for the dashboard

These are consumed as ordinary npm packages and are not copied into the
source tree, but they are new to the project and their licences are listed
here for completeness.

| Package                     | Licence    | Used for                                    |
| --------------------------- | ---------- | ------------------------------------------- |
| `radix-ui`                  | MIT        | Headless primitives behind `src/components/ui` |
| `lucide-react`              | ISC        | Icons                                       |
| `class-variance-authority`  | Apache-2.0 | Component variant definitions               |
| `cn`                        | MIT        | Class name merging (`cn()`)                 |
| `sonner`                    | MIT        | Toast notifications                         |
| `tw-animate-css`            | MIT        | Enter/exit animation utilities              |
| `zod`                       | MIT        | Form and payload validation                 |
