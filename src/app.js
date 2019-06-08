const Koa = require('koa')
const Router = require('koa-router')
var bodyParser = require('koa-bodyparser')
const util = require('./utils/generateGrid')

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/grid/generate', (ctx) => {
  ctx.body = util.generateGrid()
})

router.post('/grid/calc', (ctx) => {
  ctx.body = util.generateGrid(ctx.request.body.grid)
})

app.use(router.routes())

module.exports = app
