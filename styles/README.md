# Styling

This project uses a Sass preprocessor to handle styling. If you are using VSCode, you will need [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) to convert sass to CSS.



Main style file located at `app.scss` includes style from all pages. This file will only load stylesheets usign `@use` rule.

## Directories

### Tools

Contains stylesheets which include `breakpoints`, `mixins`, `variables` and `global` styles.

### Pages

Contains a different stylesheet for each page. They are loaded into `app.scss`.

## Note

On `/utils/helpers.js`, there is a `stripTable` function which is used in `/[chapter].js` and is a hacky way to add strip background styling to a table with
dynamic row spans. You can find its usage on this [Codepen](https://codepen.io/PixeledCode/pen/BaRxmNw).
