import imageUrlBuilder from '@sanity/image-url';
import { getClient } from './client';

const builder = imageUrlBuilder(getClient());

export function urlForImage(source) {
  if (!source) {
    return null;
  }
  
  return builder.image(source);
} 