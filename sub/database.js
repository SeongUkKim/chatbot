const mysql = require('mysql');
var db;

// 커넥션 생성 
    db = mysql.createConnection({
      host:'host',
      port:'port',
      user: 'user',
      password:'password',
      database:'database'
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
