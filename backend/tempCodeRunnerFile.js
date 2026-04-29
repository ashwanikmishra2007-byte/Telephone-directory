
app.post('/add',(req,res)=>{
    res.send('Hello, World!');
    console.log(req.body);
});

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}/add`);
});