import { Hono } from 'hono'
import { Address } from 'viem'
import prisma from '@/lib/prisma'

export const userKeys = {
    all: ['users'] as const,
    users: () => [...userKeys.all, 'users'] as const,
    user: (address: Address) => [...userKeys.users(), address] as const,
}

const app = new Hono().get('/:address',
    async (c) => {
    const address = c.req.param('address')
    const user = await prisma.user.findUnique({
      where: {
        address: address.toLowerCase(),
      },
    })
  
    return c.json(user ?? { id: 0, name: 'NO NAME', address: '0x...', iconUrl: '' })
  })

export default app