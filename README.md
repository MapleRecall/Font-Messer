# Font Messer

Create messed fonts with rules. Used to create custom fonts for the [LiteLoaderQQNT-CCND](https://github.com/MapleRecall/LiteLoaderQQNT-CCND).

> [!WARNING]
> Initial code, confusing and disorganized. Not yet been librarianized.

| Source | ![](https://github.com/user-attachments/assets/3a96dfa1-c9f5-46aa-8430-750e6d501382) |
| ---- | ------- |
| Messed 1 | ![](https://github.com/user-attachments/assets/ee697468-15e0-40a2-a755-d9816902c1b2) |
| Messed 2 | ![](https://github.com/user-attachments/assets/26b8e9b5-89d4-4b83-9a7e-aad6fcae32b6) |

## Usage

1. Change config in `index.js` to generate custom fonts.
1. Then run `npm run mess` to generate the font

## Configuration

### `fontPath` Path to the font file

> [!WARNING]
> Only tested with `.otf` files.

### `replaceSet` Array of rules to replace characters

> [!TIP]
> You can check the [preset.js](/src/presets.js) to see how it works.

Each rule is an array with 1 or 2 elements.
| | | |
| ---- | ------- | -------- |
| 0 | Source characters | required |
| 1 | Target characters. If not provided, the source character will be self-messed | |

```js
replaceSet = [
    ["source"], // rule 1
    ["source", "target"], // rule 2
    [...]
]
```
