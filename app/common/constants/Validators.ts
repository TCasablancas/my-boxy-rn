import { stripMask } from './Masks';

export function isValidFullName(name: string): boolean {
  const trimmed = name.trim().replace(/\s+/g, ' ');
  // Exige nome + sobrenome (pelo menos duas palavras com 2+ letras cada)
  const parts = trimmed.split(' ').filter((p) => p.length >= 2);
  return parts.length >= 2;
}

export function isValidUsername(username: string): boolean {
  // minúsculas, números, ponto e underscore, 3 a 20 caracteres
  return /^[a-z0-9._]{3,20}$/.test(username);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = stripMask(phone);
  return digits.length === 10 || digits.length === 11;
}

export function isValidCEP(cep: string): boolean {
  return stripMask(cep).length === 8;
}

/**
 * Validação de CPF por dígito verificador (algoritmo oficial).
 * Não garante que o CPF exista na Receita Federal, apenas que é
 * matematicamente válido — a checagem de existência/duplicidade deve
 * ser feita no backend.
 */
export function isValidCPF(cpf: string): boolean {
  const digits = stripMask(cpf);
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false; // todos os dígitos iguais

  const calcCheckDigit = (base: string, factor: number) => {
    let total = 0;
    for (const char of base) {
      total += parseInt(char, 10) * factor;
      factor -= 1;
    }
    const rest = (total * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const digit1 = calcCheckDigit(digits.slice(0, 9), 10);
  const digit2 = calcCheckDigit(digits.slice(0, 10), 11);

  return digit1 === parseInt(digits[9], 10) && digit2 === parseInt(digits[10], 10);
}
