# Font Messer

Create messed fonts with rules. Used to create custom fonts for the [LiteLoaderQQNT-CCND](https://github.com/MapleRecall/LiteLoaderQQNT-CCND).

> [!WARNING]
> Initial code, chaos and disorder, not yet libraryized.

## Usage

1. Change config in `index.js` to generate custom fonts.
1. Then run `npm run mess` to generate the font

## Configuration

### `fontPath` Path to the font file

> [!WARNING]
> Only tested with `.otf` files.

### `replaceSet` Array of rules to replace characters

> [!TIP]
> You can check the `preset.js` to see how it works.

Each rule is an array with 1 or 2 elements.
| | | |
| ---- | ------- | -------- |
| 0 | Source characters | required |
| 1 | Target characters. If not provided, the source character will be self-messed | |

```js
replaceSet = [
    ["srouce"], // rule 1
    ["srouce", "target"], // rule 2
    [...]
]
```
