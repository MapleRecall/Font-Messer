# Font Messer

Create messed fonts with rules. Used to create custom fonts for the [LiteLoaderQQNT-CCND](https://github.com/MapleRecall/LiteLoaderQQNT-CCND).

> [!WARNING]
> Initial code, chaos and disorder, not yet libraryized.

## Usage

Modify the code in `index.js` to generate custom fonts.

### `fontPath` Path to the font file

> [!WARNING]
> Only tested with `.otf` files.

### `replaceSet` Array of rules to replace characters

Each array has 2 elements:

1. Source characters
1. `optional` Target characters. If not provided, the source character will be self-messed

You can check the `preset.js` to see how it works.

Then run `npm run mess` to generate the font