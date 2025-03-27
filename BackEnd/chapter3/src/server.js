import express from 'express'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'


const app = express()
const PORT = process.env.PORT || 8088

// Get the file path from the URL of the current module 
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path 
const __dirname = dirname(__filename)

// MIDLEWARE
// Serves the html file from  the /public directory
// Tells express to serve all files from the public folder as static assets /file. Any requests for the css files will be resolved to the poublic directory 

app.use(express.static(path.join(__dirname,'../public')))
// app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())

// Serving up the HTML file from the /public directory
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

// Routes
app.use('/auth',authRoutes)
// app.use('/todos',authMiddleware,todoRoutes)
app.use('/todos', authMiddleware, todoRoutes);




app.listen(PORT,()=>{
    console.log(`Server has started on PORT ${PORT}`)
})

process.on("SIGINT", () => {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("Server shut down properly.");
        process.exit(0);
    });
});