import * as Presets from "./src/data/presets.js";
import { main } from "./src/main.js";

const fontPath = String.raw`SOURCEHANSANSSC-REGULAR.OTF`;
const replaceSet = Presets.KFC;

main(fontPath, replaceSet).catch(console.error);
