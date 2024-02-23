import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import maidsHolder from './maidsHolder'
import nftHolder from './nftHolder'
import ownedNfts from './ownedNfts'
import user from './user'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app
  .route('/user', user)
  .route('ownedNfts', ownedNfts)
  .route('maidsHolder', maidsHolder)
  .route('nftHolder', nftHolder)

export const GET = handle(app)
export type AppType = typeof routes
