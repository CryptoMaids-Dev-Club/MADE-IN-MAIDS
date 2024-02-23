import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import user from './user'

const app = new Hono().basePath('/api')

app.route('/user', user)

export const GET = handle(app)