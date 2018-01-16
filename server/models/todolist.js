import db from '../config/db'

const listModel = '../schema/list.js'
const Todolist = db.import (listModel)

const getTodoListInfoById = async function (id) {
    const todolist = await Todolist.findAll({ // 查找全部的todolist
        where: {
            user_id: id
        },
        attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
    })

    return todolist // 返回数据
}

const createTodoList = async function (data) {
    await Todolist.create({user_id: data.userId, content: data.content, status: data.status})
    return true;
}

const deleteTodoList = async function (id, user_id) {
    const result = await Todolist.destroy({
        where: {
            id,
            user_id
        }
    })

    return result == 1;
}

const updateTodoList = async function (id, user_id, status) {
    const result = await Todolist.update({
        status
    }, {
        where: {
            id,
            user_id
        }
    })

    return result[0] == 1
}

export default {
    getTodoListInfoById,
    createTodoList,
    deleteTodoList,
    updateTodoList
}