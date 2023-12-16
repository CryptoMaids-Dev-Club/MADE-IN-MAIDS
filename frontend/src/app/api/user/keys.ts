export const userKeys = {
  all: ['users'] as const,
  users: () => [...userKeys.all, 'users'] as const,
  user: (address: string) => [...userKeys.users(), address] as const,
}
