import { shuffle } from "fast-shuffle";
import { Font, woff2 } from "fonteditor-core";
import opentype from "opentype.js";

const NOTDEF_GLYPH = new opentype.Glyph({
  name: ".notdef",
  unicode: 0,
  advanceWidth: 650,
  path: new opentype.Path(),
});

export default async function (fontFilePath) {
  const _woff2 = woff2.init();
  const sourceFont = await opentype.load(fontFilePath);

  return async function (originalTextArr) {
    const messedCharMap = {};
    const messedGlyphsMap = {};

    originalTextArr.forEach(([sourceChars, targetChars]) => {
      targetChars?.length || (targetChars = sourceChars);

      console.info("-".repeat(20));
      console.info(`Mess [${sourceChars.slice(0, 3)}...] => [${targetChars.slice(0, 3)}...]`);

      const sourceCharSet = shuffle([...new Set(sourceChars)]);
      const targetGlyphSet = shuffle([...targetChars].map((c) => [c, sourceFont.charToGlyph(c)]).filter(([, g]) => g.unicode));

      console.info(`Valid target glyphs: ${targetGlyphSet.length}/${targetChars.length}`);

      if (!sourceChars.length || !targetGlyphSet.length) {
        console.warn(`No valid glyphs found for source or target characters.`);
        return;
      }

      sourceCharSet.forEach((sourceChar) => {
        if (messedCharMap[sourceChar]) return;
        const unicode = sourceChar.codePointAt(0);

        const target = targetGlyphSet.shift();
        targetGlyphSet.push(target);

        const [targetChar, targetGlyph] = target;
        messedCharMap[sourceChar] = targetChar;

        if (!messedGlyphsMap[targetChar]) {
          const messedGlyph = new opentype.Glyph(targetGlyph);
          messedGlyph.unicode = unicode;
          messedGlyph.unicodes = [unicode];
          messedGlyphsMap[targetChar] = messedGlyph;
        } else {
          messedGlyphsMap[targetChar].unicodes.push(unicode);
        }
      });

      console.info(`${sourceCharSet.length} => ${targetGlyphSet.length}`);
    });

    const messedFont = new opentype.Font({
      familyName: "MessedFont",
      styleName: "medium",
      unitsPerEm: sourceFont.unitsPerEm,
      ascender: sourceFont.ascender,
      descender: sourceFont.descender,
      glyphs: [NOTDEF_GLYPH, ...Object.values(messedGlyphsMap)], // ".notdef" is required.
    });

    console.time("Font to ArrayBuffer");
    const fontArrayBuffer = messedFont.toArrayBuffer();
    console.timeEnd("Font to ArrayBuffer");

    const fontBufferOtf = Buffer.from(fontArrayBuffer);
    const base64Otf = `data:font/otf;base64,${fontBufferOtf.toString("base64")}`;

    const font = Font.create(fontBufferOtf, { type: "otf" });
    const font2 = Font.create();

    console.time("woff2");
    await _woff2;
    const fontBufferWoff2 = font.write({ type: "woff2" });
    const base64Woff2 = `data:font/woff2;base64,${fontBufferWoff2.toString("base64")}`;
    console.timeEnd("woff2");

    return {
      messedCharMap,
      fontBufferOtf,
      base64Otf,
      fontBufferWoff2,
      base64Woff2,
    };
  };
}
