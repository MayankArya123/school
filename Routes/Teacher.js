const router=require('express').Router()
//const { models } = require('mongoose')
let Teacher = require('../Schema/Teacher')

router.post('/Register',(req,res)=>{

    const {name,password} = req.body

    if(name === ''){
        res.json("name can't be empty")
   }
  else if(password === ''){
        res.json("password can't be empty")
   }

   else {
    const NewTeacher = new Teacher({
        name:name.replace(/\s/g, '').toUpperCase(),
        password:password.replace(/\s/g, '')
    })

    Teacher.collection.insertOne(NewTeacher).then((succs)=>{
        console.log('see',succs)
          res.json(succs)
    }).catch(err=>{
        console.log('err',err)
    })
   }
    
})


router.get('/Login/:name/:password',(req,res)=>{

      const name= req.params.name.replace(/\s/g, '').toUpperCase()
      const password= req.params.password.replace(/\s/g, '')

   // console.log(name,password)

    Teacher.collection.findOne({
        name:name,
        password:password
    }).then((succs)=>{

        if(succs === null)  {
            res.json('invalid username or invalid password')
        }
        else {
           res.json(succs)
        }
        // res.json(succs)

    }).catch(err=>{
        console.log('err',err)
    })
})

module.exports=router