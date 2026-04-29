const express=require('express');
const router=express.Router();
const connectToDatabase=require('./db');

async function insert(name, phone) {
    const db = await connectToDatabase();
    const query = 'INSERT INTO contacts (name, phone) VALUES (?, ?)';
    const [result] = await db.execute(query, [name, phone]);
    return result;
}


router.post('/add',async (req,res)=>{
    try {
        const { name, phone } = req.body;
        if(!name || !phone) {
            return res.status(400).json({ result: 'Name and phone are required' });
        }
        await insert(name, phone);
        console.log(`Inserted into database: ${name}, ${phone}`);
        console.log('Server hit');
        return res.status(200).json({result: 'Data inserted successfully'});
    } catch (error) {
        return res.status(500).json({ result: 'Internal server error', details: error.message });
    }
});

module.exports = router;