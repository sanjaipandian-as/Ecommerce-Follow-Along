const {app} = require("./app") 
require("dotenv").config()
const PORT=process.env.PORT || 8050
const connection=require("./db/connection")








app.listen(PORT,async()=>{
     try {
        await connection
        console.log( `Server is running on http://localhost:${PORT}`)

     } catch (error) {
          console.log(error)
     }
    
})