# Pages

## `/` Foundation page

Entry: `frontend/src/App.tsx`

Dependency direction:

- `frontend/index.html` → `frontend/src/main.tsx` → `frontend/src/App.tsx`
- `frontend/src/App.tsx` → `frontend/src/api.ts`
- `frontend/src/App.tsx` → `frontend/src/styles.css`

`main.tsx` is the entry point and does not import styles directly; `App.tsx` owns the page stylesheet.
