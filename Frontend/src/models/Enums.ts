export enum UserRole {
  intern = 1,
  secretary,
  manager,
  supervisor,
}

export const UserRoleNames: Record<UserRole, string> = {
  [UserRole.intern]: 'Estagiário',
  [UserRole.secretary]: 'Secretário',
  [UserRole.manager]: 'Responsável Técnico',
  [UserRole.supervisor]: 'Orientador',
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

export enum PatientGroup {
  Adult = 1,
  Child,
  Teenager,
  Elderly,
}

export const PatientGroupNames: Record<PatientGroup, string> = {
  [PatientGroup.Adult]: 'Adulto',
  [PatientGroup.Child]: 'Criança',
  [PatientGroup.Teenager]: 'Adolescente',
  [PatientGroup.Elderly]: 'Idoso',
};

export function getTranslatedPatientGroup(patient: PatientGroup): string {
  return PatientGroupNames[patient] || 'Desconhecido';
}
