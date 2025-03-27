import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// Register a new user endpoint  /auth/register
router.post('/register',(req,res)=>{
    const {username,password} = req.body
    // save email and encrpyted password

    // Encrypt the password 
    const hashedpassword = bcrypt.hashSync(password,8)

    // 
    try{
        const insertUser=db.prepare(`
            INSERT INTO users(username,password)
            VALUES(?,?)
            `)
            const result =insertUser.run(username,hashedpassword)

            // Default todo for the new user
            const defaultTodo = `Hello :) Add your first todo`
            const insertTodo = db.prepare(`
                INSERT INTO todos(user_id,task)
                VALUES(?,?)
                `)
                insertTodo.run(result.lastInsertRowid,defaultTodo)
            
            // Create a token
            const token = jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:'24h'})
            res.json({token})


    }catch(e){
        console.log(e.message);
        res.sendStatus(503)
    }



})

router.post('/login',(req,res)=>{
    // we get their email and we look up the password associated with that email in the address
    // so what we can do is again one way encrypt the password the user

    const {username,password}=req.body
    try{
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        // If we cannot find a user return ot of the function

        if(!user){return res.status(404).send({message:"user not found"})}

        const passwordIsValid = bcrypt.compareSync(password,user.password)

        // If password doesnt match return ot of the function
        if(!passwordIsValid){
            return res.status(401).send({message:"invalid password"})
        }
        console.log(user)
        // Succesful authenthication
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token})
    }catch(e){
        console.log(e.message)
        res.sendStatus(503)
    }
})

export default router