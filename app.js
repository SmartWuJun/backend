// const app = require('koa')();
import Koa from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import koaRouter from 'koa-router'
import auth from './server/routes/auth'
import api from './server/routes/api'
// import cors from '@koa/cors'

const app = new Koa();
const router = koaRouter();
app.use(logger())
app.use(bodyparser())
app.use(json())
// app.use(cors())

app.use(async function (ctx, next) {
    let start = new Date()
    await next()
    let ms = new Date() - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function (err, ctx) {
    console.log('server error', err)
})
console.log('>>>>auth')
router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/api', api.routes()) // 挂载到koa-router上，同时会让所有的api的请求路径前面加上'/api'的请求路径。
app.use(router.routes())
app.listen(8889, () => {
    console.log('Koa is listening in 8889');
});

export default app;