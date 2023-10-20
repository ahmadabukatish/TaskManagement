

const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")

const app=express()
const mysql=require("mysql2")

const db=mysql.createConnection(
    {
        host:"i54jns50s3z6gbjt.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        user:"c0yvguqu2f5voy9e",
        password:"rpzto50vpszed3o2",
        database:"ru1ctmc6w31xrshz"

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
//             throw new Error(err)
//         }
//         res.send(result);})

// })
app.get("/",function(req,res){
    res.sendFile(
        path.join(__dirname,"../react-app/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.post("/api/insert",(req,res)=>{
    const title=req.body.title
    const decription=req.body.decription
    const duedate=req.body.duedate
    const status=req.body.status
    const id=req.body.id;
    if (title==="" && decription===""){throw new Error("Title and Description cant be empty")}
    const sqlInsert="INSERT INTO tasks (id,title,decription,duedate,status) VALUES (?,?,?,?,?);"
    db.query(sqlInsert,[id,title,decription,duedate,status], (err,result)=>{ 
        if (err){
            throw new Error(err)
        } })
})
app.delete("/api/delete/:id",(req,res)=>
{
    const id=req.params.id;
    const sqlDelete="DELETE FROM tasks WHERE id=?;"
    db.query(sqlDelete,id, (err,result)=>{
        if (err){
            throw new Error(err)
        }
    })

})
app.put("/api/update",(req,res)=>{
    const title=req.body.title
    const status=req.body.status
    const sqlUpdate="UPDATE tasks SET status = ? WHERE title = ?;"
    db.query(sqlUpdate,[status,title], (err,result)=>{   
        if (err){
            throw new Error(err)

        }
})
})

app.listen(process.env.PORT|| 5180,()=>
{
    console.log('running in port 5190')
})