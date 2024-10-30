import mysql from "mysql2/promise"

export  const pool = mysql.createPool('mysql://root:wbYCBMWhMnnaigAbnORiNuFpultabNeM@mysql.railway.internal:3306/railway')

export  const DbPool = mysql.createPool({
    host:'mysql.railway.internal',
    password:'wbYCBMWhMnnaigAbnORiNuFpultabNeM',
    user:'root',
    database:'railway',
    port:3306
})
