
export default function getContrastingTextColor(backgroundColor: string) {
  const rgbaMatch = backgroundColor.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbaMatch) {
    const [, rRaw, gRaw, bRaw] = rgbaMatch;
    const r = Number(rRaw);
    const g = Number(gRaw);
    const b = Number(bRaw);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.5 ? '#FFFFFF' : '#1F2937';
  }

  const normalized = backgroundColor.replace('#', '');
  const isShortHex = normalized.length === 3;
  const hex = isShortHex
    ? normalized.split('').map((ch) => `${ch}${ch}`).join('')
    : normalized;

  if (hex.length !== 6) {
    return '#FFFFFF';
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance < 0.5 ? '#FFFFFF' : '#1F2937';
}