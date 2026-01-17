const db = require("../config/db") ;

// USER TABLE 
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name Text NOT NULL ,
        email TEXT UNIQUE NOT NULL, 
        password TEXT NOT NULL, 
        address TEXT,
        role TEXT CHECK (role IN ('ADMIN', 'USER', 'STORE_OWNER')) NOT NULL 
        )
    `)
})

// STORE TABLE  
db.run(`
    CREATE TABLE IF NOT EXISTS ratings(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id INTEGER NOT NULL, 
        storeId INTEGER NOT NULL, 
        rating INTEGER CHECK (rating BETWEEN 1 AND 5),
        UNIQUE (user_id, storeId) 
        FOREIGN KEY(user_id) REFERENCES user(id) ,
        FOREIGN KEY(storeId) REFERENCES stores(id)
      )
    `)

console.log('Database Tables Initialized');