# Spacemarks

A clean, modern collection of **bookmark spacer icons** that you can drag directly into your browser’s bookmarks bar.  
Designed to visually organize bookmark clusters using subtle, minimalist separators.

---

## ✨ Features

- Beautiful **emoji-based spacer icons**, rendered uniformly via canvas.
- **Large searchable catalog** of separators (25+ styles).
- No downloads, no server, everything is served as static html through github pages.

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

