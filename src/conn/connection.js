const { set ,connect ,connection, model}  = require('mongoose')


function ConnectDataBase(){
   set('strictQuery',true)
   return connect("mongodb://127.0.0.1/SessionExample")
}

connection.on("connected",()=>{
    console.log("Connection succesfully")
})


module.exports = ConnectDataBase