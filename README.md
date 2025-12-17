# Neater Bookmarks

A clean, modern collection of **bookmark spacer icons** that you can drag directly into your browser’s bookmarks bar.  
Designed to visually organize bookmark clusters using subtle, minimalist separators.

---

## ✨ Features

- Beautiful **emoji-based spacer icons**, rendered uniformly via canvas.
- **Large searchable catalog** of separators (25+ styles).
- **Per-spacer URLs** so each bookmark can have its own icon.
- Ultra-lightweight — no build tools, no dependencies beyond Tabulator + Bootstrap CDN.

---

## 📁 Project Structure

```
neater-bookmarks/
├── app.js             # Main logic: table init, favicon generation
├── data.js            # List of spacer items with metadata
├── index.html         # Main page with drag-and-drop UI
├── LICENSE            # MIT license
├── README.md          # This file
├── styles.css         # App shell / tokens / pills / controls
└── table-theme.css    # Tabulator table theming
```

---

## 🚀 Usage

1. Open **index.html** in any modern browser.
2. Browse the catalog of spacer icons.
3. Drag any spacer from the **Drag & Drop** column to your bookmarks bar.

Each spacer creates a small, icon-only bookmark that acts as a clean visual separator.

---

## 🛠 How It Works

### Canvas-rendered icons
Each emoji is drawn on a 64×64 canvas and converted to a PNG data URL.  
This avoids inconsistent emoji rendering across platforms and yields uniform favicon output.

### Per-spacer URLs
Each spacer generates a unique URL:
```
index.html?spacer=<id>
```
When visited, that URL renders a blank page and applies the matching favicon.

---

## 🧩 Customization

You can easily:

- Add or edit spacers in **data.js**
- Tweak styling via the tokens in `styles.css` and `table-theme.css`
- Replace emojis with custom symbols or SVGs
- Modify table layout in `app.js` (Tabulator config)
