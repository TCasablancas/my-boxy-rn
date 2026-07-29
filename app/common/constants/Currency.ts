
export const parsePriceToNumber = (value: string) => {
  const raw = value.trim();
  if (!raw) {
    return 0;
  }

  const sanitized = raw.replace(/[^0-9,.-]/g, '');
  const hasComma = sanitized.includes(',');
  const hasDot = sanitized.includes('.');

  let normalized = sanitized;

  if (hasComma && hasDot) {
    const lastComma = sanitized.lastIndexOf(',');
    const lastDot = sanitized.lastIndexOf('.');
    const decimalSeparator = lastComma > lastDot ? ',' : '.';
    const thousandSeparator = decimalSeparator === ',' ? '.' : ',';

    normalized = sanitized
      .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
      .replace(decimalSeparator, '.');
  } else if (hasComma || hasDot) {
    const separator = hasComma ? ',' : '.';
    const parts = sanitized.split(separator);

    if (parts.length > 2) {
      const decimalPart = parts.pop() ?? '0';
      normalized = `${parts.join('')}.${decimalPart}`;
    } else {
      const integerPart = parts[0] ?? '0';
      const fractionPart = parts[1] ?? '';

      if (fractionPart.length === 0) {
        normalized = integerPart;
      } else if (fractionPart.length <= 2) {
        normalized = `${integerPart}.${fractionPart}`;
      } else {
        normalized = `${integerPart}${fractionPart}`;
      }
    }
  }

  normalized = normalized.replace(/(?!^)-/g, '');

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatCurrencyBRL = (value: number) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};