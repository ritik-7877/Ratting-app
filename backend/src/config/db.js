const sqlite3 = require('sqlite3').verbose() ;
const path = require('path') ;

const dbPath = path.resolve(__dirname,  '../../database.db') ;

const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.error(`Db Connection Error: ${error.message}`);
    } else {
        console.log(`Connected to the SQLite database at ${dbPath}`);
    }
})

module.exports = db ; 
