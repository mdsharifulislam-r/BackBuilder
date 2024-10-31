import mysql from "mysql2/promise"

export  const pool = mysql.createPool({
    host:'sql12.freemysqlhosting.net',
    database:'sql12741506',
    user:"sql12741506",
    password:"ghQWeKSbRA",
    port:3306,
    
    waitForConnections:true
})
export  const DbPool = mysql.createPool({
    host:'localhost',
    database:'user_database',
    user:"root",
    password:"",
    
    waitForConnections:true
})

