import Sequelize from 'sequelize'

const db = new Sequelize('todolist', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    freezeTableName: true,
    operatorsAliases: false
})
// const db = new Sequelize(`mysql://root:root@localhost/todolist`, { define: {
// timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt） } })
export default db