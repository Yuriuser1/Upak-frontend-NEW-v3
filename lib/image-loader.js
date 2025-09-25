// Custom image loader for static export
export default function imageLoader({ src, width, quality }) {
  // For static export, return the original src
  if (src.startsWith('/')) {
    return src;
  }
  
  // For external images, return as is
  return src;
}