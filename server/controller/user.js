import user from '../models/user'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const getUserInfo = async function (ctx) {
    const id = ctx.params.id; // 获取url里传过来的参数里的id
    const result = await user.getUserById(id);
    ctx.body = result;

}

const postUserAuth = async function (ctx) {
    const data = ctx.request.body;
    const userInfo = await user.getUserByName(data.name);
    if (userInfo != null) {
        if (!bcryptjs.compareSync(data.password, userInfo.password)) {
            ctx.body = {
                success: false,
                info: '密码错误'
            }
        } else {
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            }
            const secret = 'vue-backend';
            const token = jwt.sign(userToken, secret);
            ctx.body = {
                success: true,
                token
            }
        }
    } else {
        ctx.body = {
            succes: false,
            info: '用户不存在'
        }
    }
}

export default {
    getUserInfo,
    postUserAuth
}