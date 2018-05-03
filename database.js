const mysql = require('mysql');
var db;

// 커넥션 생성 
    db = mysql.createConnection({
      host:'localhost',
      port:'3306',
      user: 'root',
      password:'tedd9022@@',
      database:'Test'
    });

// 인자로 넘어온 SQL 문장 실행 
const executeQuery = async sql => {
  result = await new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
      if(err) {
        reject(err);
      } 
      resolve(rows);
    });
  });
  return result;
}

exports.executeQuery = executeQuery;
