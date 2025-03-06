import { getCollection } from "astro:content";
import { readFile } from "fs/promises";

export async function getListings() {
  const config = await themeConfig;
  if (config.directory.data.source === "json") {
    return JSON.parse(await readFile("data/directory.json", "utf-8"));
  }

  return await getCollection("directory");
}
