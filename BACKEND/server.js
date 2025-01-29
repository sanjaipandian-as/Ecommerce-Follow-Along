const {app}=require("./app")
require("dotenv").config()
const port=process.env.PORT 
app.get("./testing",async(req,res)=>{
    res.send("hellow")
})
app.listen(port,()=>{
    console.log(`app is running on  http://localhost:${port}`)
})