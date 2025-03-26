const express = require("express")
const app = express()
const PORT = 8383

let data = ['james']
// MIDDLEWARE

app.use(express.json())



// HTTP VERBS(Methods) AND ROUTES (paths) 
// The method informs the nature of request and the r0ute is further asubdirectly (basically we direct the request to the body of code to respond appropriatly , and these locations or routes are called endpoints)
// app.get('/',(req,res)=>{
//     // this is endpoint number 1 => /
//     res.send('<h1>This is actually a website</h1>')
// })

// Type 1- Website Endpoints ;- are for sending back html and they typically come when a user enters a url in the browser

app.get('/', (req, res) => {
    res.send(`<body style = "background:pink;
        color:blue;
        " >
        <p>
        <h1>
        ${JSON.stringify(data)}
        </h1>
        <a href="/dashboard">Dashboard</a>
        </p>
        
        </body>
        
        `);
});

app.get('/dashboard',(req,res)=>{
    res.send(`
        <body>
        <p>
        <h1>welcome to dashboard</h1>
        <a href="/">Home</a>
        </p>
        </body>
        `)
})

//Type 2- API Endpoints :-

// CRUD : 
// create - post
//  read -  get 
// update - put
// delete - delete


app.get('/api/data',(req,res)=>{
    console.log("this is for data")
   res.status(599).send(data)
})


app.post('/api/data',(req,res)=>{
    //someone wants to create a user (for example when they click a sign up buttom)
    // the user clicks the sign up button after entering their credentials , and their browser is wired up to send out a network request to the server to handle that action
        const newEntry = req.body
        console.log(newEntry)
        data.push(newEntry.name)
        res.sendStatus(201)
})

app.delete('/api/data',(req,res)=>{
    data.pop()
    console.log("Deleted the last element")
    res.sendStatus(203)
})

app.listen(PORT,()=>{
    console.log(`server has started on ${PORT}`)
})