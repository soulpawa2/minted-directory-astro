import configData from "@util/themeConfig";
import { defineCollection } from "astro:content";
import { sheetLoad } from "./sheets";
import { directorySchema } from "@validation/directory";
import { z } from "zod";
import { mockLoader } from "@ascorbic/mock-loader";
import { glob, file } from "astro/loaders";

export function createDirectoryCollection() {
  const source = configData.directory.data.source;

  if (source === 'sheets') {
    return defineCollection({
      loader: sheetLoad(),
      schema: directorySchema(z.string().url())
    });
  }
  else if (source === 'mock') {
    return defineCollection({
      loader: mockLoader({schema: directorySchema(z.string().url()), entryCount: 10},),
      schema: directorySchema(z.string().url())
    });
  }
  else if (source === 'json') {
    return defineCollection({
      loader: file('src/data/directory/directory.json'),
      schema: directorySchema(z.string().url())
    });
  }

  return defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/directory" }),
    schema: ({ image }) => directorySchema(image())
  });
}