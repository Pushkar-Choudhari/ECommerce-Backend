import mysql from "mysql2";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "push",
    database: "evital",
    connectionLimit: 10
})

export default pool;

// pool.query("select * from user", (err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })
