const connectToDatabase= require('./db');

async function show() {
    const db= await connectToDatabase()
    const query=`create table if not exists contacts(
    name varchar(50),
    phone varchar(10)
    )`;
    const [result]=await db.execute(query);
    console.log("table successfully created");
}

module.exports=show;
