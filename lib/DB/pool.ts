import mysql from "mysql2/promise"

export  const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    password:'ghQWeKSbRA',
    user:'sql12741506',
    database:'sql12741506',
    port:3306
})

export  const DbPool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    password:'',
    user:'admin',
    database:'user_database'
})
