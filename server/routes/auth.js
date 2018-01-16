import auth from '../controller/user'
import koaRouter from 'koa-router'

const router = koaRouter();

router.get('/user:id', auth.getUserInfo)
router.post('/user', auth.postUserAuth)

export default router