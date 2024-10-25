import mysql from "mysql2/promise"

export  const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    password:'',
    user:'root',
    database:'backbuilder'
})

export  const DbPool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    password:'',
    user:'root',
    database:'user_database'
})
