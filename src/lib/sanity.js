import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity.client';

const builder = imageUrlBuilder(client);

export function urlForImage(source) {
  if (!source) {
    return undefined;
  }
  
  return builder.image(source).auto('format').fit('max').url();
} 