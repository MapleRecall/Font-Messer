import fs from "fs";
import path from "path";
import getMesser from "./mess.js";
import * as Presets from "./data/presets.js";

const fontPath = String.raw`SOURCEHANSANSSC-REGULAR.OTF`;
const replaceSet = Presets.KFC;
main(fontPath, replaceSet).catch(console.error);


async function main(fontPath, replaceSet) {
  const { name, base, dir } = path.parse(path.resolve(fontPath));

  if (!fs.existsSync(fontPath)) {
    throw `Font file not found: ${fontPath}`;
  }

  const outputFolder = path.join(dir, `[MESSED]_${base}`, "KFC");

  const messer = await getMesser(fontPath);

  const { messedCharMap, fontBufferOtf, base64Otf, fontBufferWoff2, base64Woff2 } = await messer(replaceSet);

  fs.existsSync(outputFolder) || fs.mkdirSync(outputFolder);

  fs.writeFileSync(path.join(outputFolder, `${name}.messed.otf`), fontBufferOtf);
  fs.writeFileSync(path.join(outputFolder, `${name}.messed.otf.txt`), base64Otf);

  fs.writeFileSync(path.join(outputFolder, `${name}.messed.woff2`), fontBufferWoff2);
  fs.writeFileSync(path.join(outputFolder, `${name}.messed.Woff2.txt`), base64Woff2);

  fs.writeFileSync(path.join(outputFolder, `${name}.map.json`), JSON.stringify(messedCharMap, null, 2));

  const files = fs.readdirSync(outputFolder);
  console.log("Files in outputFolder:");
  files.forEach((file) => {
    console.log("-".repeat(20));
    const stats = fs.statSync(path.join(outputFolder, file));
    const fileSizeInKB = Math.round(stats.size / 1024);
    console.log(`${file}: ${fileSizeInKB} KB`);
    console.log(path.join(outputFolder, file));
  });
}
