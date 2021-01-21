
// Como parâmetro da função create connection eu posso passar uma connection string ou um objeto com as conffigurações

// Estrutura da connections string
// dialeto://user:senha@host:port/database

const mysql = require('mysql2/promise');

async function connect() {

    if (global.db && global.db !== 'disconnected') {
        return global.db
    }

    const connectionString = 'mysql://root:0912345lucas@localhost:3306/mv'

    const db = await mysql.createConnection(connectionString)

    console.log('Conectou ao mysql!');

    global.db = db

    return db
}


async function selectUsesr() {

    const sql1 = 'SELECT login, password FROM users WHERE id = 1;'
    // const sql2 = 'SELECT * FROM users;'

    const conn = await connect()
    const [rows] = await conn.query(sql1)
    return rows[0]
}

module.exports = {selectUsesr}