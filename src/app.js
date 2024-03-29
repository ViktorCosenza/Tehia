const Koa = require('koa')
const Router = require('koa-router')
var bodyParser = require('koa-bodyparser')
const util = require('./utils/generateGrid')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

router.get('/grid/generate', (ctx) => {
  ctx.body = util.generateGrid()
})

router.post('/grid/calc', (ctx) => {
  ctx.body = util.calcTimes(ctx.request.body.grid)
})

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
