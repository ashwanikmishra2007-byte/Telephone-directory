const express=require('express');
const router=express.Router();
const connectToDatabase=require('./db');


async function deleteContact(name, phone) {
    const db = await connectToDatabase();
    let query = 'DELETE FROM contacts WhERE name = ? AND phone = ?';
    let [result] = await db.execute(query, [name, phone]);
    return result;
}

router.delete('/delete', async (req, res) => {
    let { name, phone } = req.body;
    try {
        let result = await deleteContact(name, phone);
        console.log("Deleting:", name, phone);
        console.log("SQL result:", result);
        if (!name || !phone) {
            return res.status(400).json({ result: 'Name and phone are required' });
        }
        if ( result.affectedRows === 0) {
            return res.status(404).json({ result: 'Contact not found' });
            console.log(`Contact not found: ${name}, ${phone}`);
        }
        res.json({ result: 'Contact deleted successfully' });
        console.log(`Deleted from database: ${name}, ${phone}`);
    } catch (error) {
        res.status(500).json({ result: 'Internal server error', details: error.message });
    }
});

module.exports = router;

