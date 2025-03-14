import { sheetLoader } from "astro-sheet-loader";
import configData from "@util/themeConfig";

export const sheetLoad = sheetLoader({
  document: configData.directory.data.sheets.key,
});