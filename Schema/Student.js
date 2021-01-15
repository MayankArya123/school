const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const studentSchema = new Schema ({

    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    rollno:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const Student = mongoose.model('student',studentSchema)

module.exports= Student