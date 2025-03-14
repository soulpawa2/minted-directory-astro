import { z, defineCollection } from "astro:content";
import configData from "@util/themeConfig";
import { sheetLoad } from "@lib/loaders/sheets";
import { mockLoader } from "@ascorbic/mock-loader";
import { glob } from 'astro/loaders';

const directorySchema =
  z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    icon: z.string().optional(),
    image: z.string().url().optional(),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
  });

let directoryCollection;
const source = configData.directory.data.source;
if (source === 'sheets') {
  directoryCollection = defineCollection({
    loader: sheetLoad,
    type: 'content_layer',
    schema: directorySchema
  });
}
else if (source === 'mock') {
  directoryCollection = defineCollection({
    loader: mockLoader({schema: directorySchema, entryCount: 10},),
    type: 'content_layer',
    schema: directorySchema
  });
}
else {
  directoryCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/directory" }),
    type: 'content_layer',
    schema: directorySchema
  });
}



const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  directory: directoryCollection,
  pages: pagesCollection,
};
