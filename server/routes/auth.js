import auth from '../controller/user'
import koaRouter from 'koa-router'

const router = koaRouter();

router.post('/user', auth.postUserAuth)

export default router