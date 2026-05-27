# Portfolio Vision Gallery Upgrade

Upload these two files to the root of `PFDED/PSwebsite`:

- `vision-addon.css`
- `vision-addon.js`

Then edit `vision.html`.

Add this line after `<link rel="stylesheet" href="bat.css">`:

```html
<link rel="stylesheet" href="vision-addon.css">
```

Add this line after `<script src="joker.js"></script>`:

```html
<script src="vision-addon.js"></script>
```

Recommended next performance step: compress the large gallery photos and upload WebP copies. Code can improve loading behavior, but file size is still the biggest speed factor on GitHub Pages.
