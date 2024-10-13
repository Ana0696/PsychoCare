export enum UserRole {
  intern = 1,
  secretary,
  psychologist,
  supervisor,
}

export const UserRoleNames: Record<UserRole, string> = {
  [UserRole.intern]: 'Estagiário',
  [UserRole.secretary]: 'Secretário',
  [UserRole.psychologist]: 'Psicólogo',
  [UserRole.supervisor]: 'Coordenador',
};

export function getTranslatedUserRole(role: UserRole): string {
  return UserRoleNames[role] || 'Desconhecido';
}

export enum DayOfWeek {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export const DayOfWeekNames: Record<DayOfWeek, string> = {
  [DayOfWeek.Sunday]: 'Domingo',
  [DayOfWeek.Monday]: 'Segunda-feira',
  [DayOfWeek.Tuesday]: 'Terça-feira',
  [DayOfWeek.Wednesday]: 'Quarta-feira',
  [DayOfWeek.Thursday]: 'Quinta-feira',
  [DayOfWeek.Friday]: 'Sexta-feira',
  [DayOfWeek.Saturday]: 'Sábado',
};

export function getTranslatedDayOfWeek(day: DayOfWeek): string {
  return DayOfWeekNames[day] || 'Desconhecido';
}
