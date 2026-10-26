# Storybook `preview-stats.json` misses `templateUrl` and Sass partials (TurboSnap)

Minimal reproduction for a `@storybook/angular-vite` bug: `preview-stats.json` written
by `@storybook/builder-vite` has no node for a component's `templateUrl` `.html` file,
nor for a Sass partial pulled with `@use`. `chromatic trace` therefore maps a change to
these files to 0 story files.

## Layout

```
src/component/component.ts        // templateUrl + styleUrl
src/component/component.html
src/component/component.scss      // @use '../styles/global';
src/styles/_global.scss           // shared Sass partial
src/component/component.stories.ts
src/card/card.component.ts        // renders the component
src/card/card.stories.ts
.storybook/main.ts                // framework @storybook/angular-vite, jit: true
```

Both stories (`Demo`, `Card`) render the demo component, so every file of the demo
component should trace to 2 story files.

## Steps

Tested with Node 22.22.3 and npm 10.9.8, against the public npm registry.

```bash
npm install
git init && git add -A && git commit -m baseline     # chromatic trace must run inside a git repository
npx ng run repro:build-storybook                      # writes storybook-static/preview-stats.json
scripts/trace-all.sh                                  # or: npx chromatic trace -s storybook-static/preview-stats.json <file>
```

Notes:

- The `.npmrc` of this repo sets `legacy-peer-deps=true`. Without it, `npm install` crashed
  with npm 10.9.8 (`npm error Cannot read properties of null (reading 'edgesOut')`).
- `chromatic trace` fails with "Chromatic only works from inside a Git repository" outside a
  git repository. It does not modify any file.
- The build prints a Rolldown chunk size warning; it is unrelated.

## Expected vs actual

| Changed file | Story files traced (actual) | Expected |
| --- | --- | --- |
| `src/component/component.ts` | 2 | 2 |
| `src/component/component.scss` | 2 | 2 |
| `src/component/component.html` | **0** | 2 |
| `src/styles/_global.scss` | **0** | 2 |

## Versions

`storybook` / `@storybook/angular-vite` 10.6.3, `@analogjs/vite-plugin-angular` 2.9.0,
`vite` 8.1.5, `chromatic` 18.13.1, `@angular/core` 22.1.1, `sass` 1.89.2.
