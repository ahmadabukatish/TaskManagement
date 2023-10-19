

const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")

const app=express()
const mysql=require("mysql2")

const db=mysql.createPool(
    {
        host:"localhost",
        user:"root",
        password:"Sosomomo2!",
        database:"taskmanagementdatabase"

    }
)
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.get("/api/get",(req,res)=>{
//     const sqlSelect="SELECT * FROM tasks";
//     db.query(sqlSelect,(err,result)=>{
//         if (err){
//             throw (err);
//         }
//         res.send(result);})

// })

app.get("/*",function(req,res)
{
    res.sendFile(
        path.join(__dirname,"../client/build/index.html"),
        function(err){
            if(err){res.status(500).send(err)}
        }
    )
})
app.post("/api/insert",(req,res)=>{
    const title=req.body.title
    const decription=req.body.decription
    const duedate=req.body.duedate
    const status=req.body.status
    if (title===""){throw new Error("Title cant be empty")}
    const sqlInsert="INSERT INTO tasks (title,decription,duedate,status) VALUES (?,?,?,?);"
    db.query(sqlInsert,[title,decription,duedate,status], (err,result)=>{ 
        if (err){
            throw (err);
        } })
})
app.delete("/api/delete/:title",(req,res)=>
{
    const title=req.params.title;
    const sqlDelete="DELETE FROM tasks WHERE title = ?;"
    db.query(sqlDelete,title, (err,result)=>{
        if (err){
            throw (err);
        }
    })

})
app.put("/api/update",(req,res)=>{
    const title=req.body.title
    const status=req.body.status
    const sqlUpdate="UPDATE tasks SET status = ? WHERE title = ?;"
    db.query(sqlUpdate,[status,title], (err,result)=>{   
        if (err){
            throw (err);
        }
})
})

app.listen(process.env.PORT,5180,()=>
{
    console.log('running in port 5190n')
})