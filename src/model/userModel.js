const bcrypt = require('bcrypt')
const { Schema, model} = require('mongoose')

const userSchema = Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.pre('save',async function(next){
    this.password =  await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isValidate = async function(password){
return await bcrypt.compare(password,this.password)
}

const userModel = model('user',userSchema)

module.exports = userModel