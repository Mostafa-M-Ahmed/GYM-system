import mysql2 from 'mysql2'


const db_connection = mysql2.createConnection({
  hose: 'localhost',
  database: 'gym',
  user: 'root',
  password: ''
})

db_connection.connect((err) => {
  if (err) {
    console.log('error connecting to database');;
    console.log(err);
  } else {
    console.log('connected to database');
  }
})


export default db_connection;
