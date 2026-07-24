/**
 * Formata uma data para o padrão brasileiro (DD/MM/AAAA)
 * @param {Date|string} date - Objeto Date ou string de data
 * @returns {string} Data formatada
 */

export const formatDate = (date?: Date | string): string => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};