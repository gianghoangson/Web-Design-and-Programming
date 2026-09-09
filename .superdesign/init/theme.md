# Theme

## Token summary

- Background: `#0c111b`
- Primary text: `#e8edf5`
- Secondary text: `#a9b5c8`
- Accent/success: `#67d7c0`
- Error: `#ff9b9b`
- Border: `#2c394d`
- Font: `Inter`, system-ui, sans-serif
- Responsive type: `clamp(2rem, 6vw, 4rem)` for the page heading

## Raw source

```css
:root {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  color: #e8edf5;
  background: #0c111b;
  font-synthesis: none;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  min-width: 320px;
}
main {
  max-width: 720px;
  margin: 0 auto;
  padding: 15vh 24px;
}
.eyebrow {
  color: #67d7c0;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
}
h1 {
  font-size: clamp(2rem, 6vw, 4rem);
  line-height: 1.05;
  margin: 16px 0;
}
p {
  color: #a9b5c8;
  line-height: 1.6;
}
.status {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 36px;
  padding: 16px;
  border: 1px solid #2c394d;
  border-radius: 12px;
}
.status-success {
  color: #67d7c0;
}
.status-error {
  color: #ff9b9b;
}
button {
  border: 1px solid #67d7c0;
  border-radius: 8px;
  padding: 8px 12px;
  color: #0c111b;
  background: #67d7c0;
  cursor: pointer;
}
```

Source: `frontend/src/styles.css`.
