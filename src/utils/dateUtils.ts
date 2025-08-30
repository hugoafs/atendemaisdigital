/**
 * Utilitários para manipulação de datas e horários no formato brasileiro
 */

// Função para obter data atual no formato YYYY-MM-DD sem problemas de timezone
export const getCurrentDateBR = (): string => {
  const now = new Date();
  // Usar timezone do Brasil (UTC-3)
  const brTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
  return brTime.toISOString().split('T')[0];
};

// Função para obter horário atual no formato HH:MM
export const getCurrentTimeBR = (): string => {
  const now = new Date();
  const brTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
  return brTime.toTimeString().slice(0, 5); // HH:MM
};

// Função para converter data do banco para Date object sem problemas de timezone
export const parseAppointmentDate = (dateString: string): Date => {
  // Assumir que a data do banco está em formato YYYY-MM-DD
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month é 0-indexed
};

// Função para formatar data no padrão brasileiro
export const formatDateBR = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });
};

// Função para formatar data longa no padrão brasileiro
export const formatDateLongBR = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Função para formatar horário no padrão brasileiro (24h)
export const formatTimeBR = (timeString: string): string => {
  // Se já está no formato HH:MM, retornar como está
  if (timeString.length === 5 && timeString.includes(':')) {
    return timeString;
  }
  
  // Se está no formato HH:MM:SS, extrair apenas HH:MM
  if (timeString.length === 8 && timeString.includes(':')) {
    return timeString.substring(0, 5);
  }
  
  return timeString;
};

// Função para comparar datas ignorando timezone
export const isSameDate = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// Função para normalizar data para comparação (remove timezone)
export const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Função para obter início da semana (domingo) no timezone brasileiro
export const getStartOfWeekBR = (date: Date): Date => {
  const normalized = normalizeDate(date);
  const dayOfWeek = normalized.getDay();
  const startOfWeek = new Date(normalized);
  startOfWeek.setDate(normalized.getDate() - dayOfWeek);
  return startOfWeek;
};

// Função para obter fim da semana (sábado) no timezone brasileiro
export const getEndOfWeekBR = (date: Date): Date => {
  const startOfWeek = getStartOfWeekBR(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return endOfWeek;
};

// Função para converter Date para string no formato do banco (YYYY-MM-DD)
export const dateToDBFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Função para obter array de datas da semana
export const getWeekDatesBR = (date: Date): Date[] => {
  const startOfWeek = getStartOfWeekBR(date);
  const weekDates = [];
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDates.push(day);
  }
  
  return weekDates;
};

// Função para verificar se uma data é hoje
export const isToday = (date: Date): boolean => {
  const today = new Date();
  const todayBR = new Date(today.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
  return isSameDate(date, todayBR);
};
