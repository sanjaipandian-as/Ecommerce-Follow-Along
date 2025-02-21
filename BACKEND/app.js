
let express= require("express")

const {userRoute} = require("./controllers/userRoute")
let app=express()
app.use(express.json())

const cors= require("cors")

const Errorhandle=require("./middelware/error")


app.use(cors ({
    origin: 'http://localhost:5173/',
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"]
}))

// app.use(cors({
//     origin: 'http://localhost:5175', 
//     credentials: true
// }));

app.use("/user",userRoute)

 



app.use(Errorhandle)

module.exports={app}