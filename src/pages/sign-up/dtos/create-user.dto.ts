export interface CreateUserDTO {
  name: string,
  email: string,
  password: string,
  groupId: number,
  subjectId?: number | null,
}