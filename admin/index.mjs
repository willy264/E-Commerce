import express from 'express';
const app = express();
import 'dotenv/config'
import cors from 'cors'
import {fileURLToPath} from 'url'
import path from 'path'
import { readdirSync } from 'fs';

const port = process.env.PORT || 8000
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url) // getting the file url
const __dirname = path.dirname(__filename) // putting the file url as the directory name

const routesPath = path.resolve(__dirname, './routes') //connecting to the routes
// console.log('route', routesPath)
const routeFiles = readdirSync(routesPath) //accessing the routes parameter
// console.log(routeFiles)
routeFiles.map(async(file) => { //mapping through the routes parameter in the array
  const routeModule = await import(`./routes/${file}`)
  app.use('/', routeModule.default)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')) //mapping through the links in the index.html so that we won't call the links one after the other
})

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})