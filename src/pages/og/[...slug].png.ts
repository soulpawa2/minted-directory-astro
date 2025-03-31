import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import fs from 'fs';
import path from 'path';
import { ImageResponse } from '@vercel/og';
import { getRootPages } from '@lib/getRootPages';
import config from '@util/themeConfig';

const boldFontPath = 'node_modules/@fontsource/gabarito/files/gabarito-latin-700-normal.woff' as const;
const regularFontPath = 'node_modules/@fontsource/gabarito/files/gabarito-latin-400-normal.woff' as const;
 
interface Props {
  params: { slug: string };
}
 
export async function GET({ params }: Props) {
  const title = config.general.title;
  const { slug } = params;
  const entry = await getEntry('directory', slug);

  // using custom font files
  const GabartitoSansBold = fs.readFileSync(path.resolve(boldFontPath));
  const GabaritoSansRegular = fs.readFileSync(
    path.resolve(regularFontPath),
  );
 
  // entry cover with Image is pretty tricky for dev and build phase
  const postCover = fs.readFileSync(
    process.env.NODE_ENV === 'development'
      ? path.resolve(
          entry.data.image.src.replace(/\?.*/, '').replace('/@fs', ''),
        )
      : path.resolve(entry.data.image.src.replace('/', 'dist/')),
  );
 
  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            tw: 'w-[200px] h-[200px] flex rounded-3xl overflow-hidden',
            children: [
              {
                type: 'img',
                props: {
                  src: postCover.buffer,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex flex-col max-w-xl',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-zinc-800',
                  style: {
                    fontSize: '48px',
                    fontFamily: 'Gabarito Bold',
                  },
                  children: entry.data.title,
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-zinc-500 mt-2',
                  style: {
                    fontSize: '18px',
                    fontFamily: 'Gabarito Regular',
                  },
                  children: entry.data.description,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[40px] bottom-[40px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-gray-900 text-4xl',
                  style: {
                    fontFamily: 'Gabarito Bold',
                  },
                  children: `${title}`,
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: '#fff',
        fontFamily: 'Gabarito Regular',
      },
    },
  };
 
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'Gabarito Bold',
        data: GabartitoSansBold.buffer,
        style: 'normal',
      },
      {
        name: 'Gabarito Regular',
        data: GabaritoSansRegular.buffer,
        style: 'normal',
      },
    ],
  });
}
 
// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  return await getRootPages(false);
}