const router=require('express').Router()

//const { models } = require('mongoose')
let Student = require('../Schema/Student')

router.put('/updateStudentById/:name/:password/:checked',(req,res)=>{
 
    // var mongoObjectId = mongoose.Types.ObjectId(req.params.id);
      console.log('hitting updateExerciseById',req.params.name,req.params.password,req.params.checked)
        Student.findOneAndUpdate({name:req.params.name,
               password:req.params.password
      }, {$set:{status:req.params.checked}},{ new: true, })
         .then(student => res.json(student))
         .catch(err => res.json(err))
  })

router.get('/DeleteAllStudents',(req,res)=>{

    //  const {name,password} = req.body

    //  const NewStudent = new Student({
    //      name:name,
    //      password:password
    //  })

         console.log('hitting route delete all students')
     Student.remove().then((succs)=>{
         console.log('all students',succs)
          res.json(succs)
     }).catch(err=>{
         console.log('err',err)
     })
})

router.get('/GetAllStudents',(req,res)=>{

    //  const {name,password} = req.body

    //  const NewStudent = new Student({
    //      name:name,
    //      password:password
    //  })
     Student.find().then((succs)=>{
         console.log('all students',succs)
          res.json(succs)
     }).catch(err=>{
         console.log('err',err)
     })
})

router.get('/Login/:name/:password',(req,res)=>{

 

    const name= req.params.name.replace(/\s/g, '').toUpperCase()
    const password= req.params.password.replace(/\s/g, '')

    if(name === ''){
        res.json("name can't be empty")
   }
  else if(password === ''){
        res.json("password can't be empty")
   }

   else {
    Student.collection.findOne({
        name:name,
        password:password
    }).then((succs)=>{
         console.log('h',succs) 
         if(succs === null)  {
             res.json('invalid username or invalid password')
         }
         else {
            res.json(succs)
         }
    }).catch(err=>{
        console.log('err',err)
    })
   }

 // console.log(name,password)


})

router.post('/Register',(req,res)=>{
     const { name, password,rollno} = req.body

     if(name === ''){
          res.json("name can't be empty")
     }
    else if(password === ''){
          res.json("password can't be empty")
     }

     else {
        const NewStudent = new Student({
            name:name.replace(/\s/g, '').toUpperCase(),
            status:'',
            password:password.replace(/\s/g, ''),
            rollno:rollno
           
        })
   
        Student.collection.insertOne(NewStudent).then((succs)=>{
            console.log('see',succs)
            res.json(succs)
        }).catch(err=>{
            console.log('err',err)
        })
     }

 


})




module.exports=router

