import app from './src/app';

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})

server.on('error', err => console.log(`Error: ${err}`))