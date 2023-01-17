import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { addImage, getImages } from './database.js'

const app = express()

const upload = multer({ dest: 'images/' })

app.use(express.static('dist'))

app.post("/api/images", upload.single('kat'), async (req, res) => {
  console.log(req.body)
  console.log(req.file)

  // store data in a database
  const description = req.body.description
  const fileName = req.file.filename
  const result = await addImage(fileName, description)

  res.send(result)
})

app.get("/api/images", async (req, res) => {
  const images = await getImages()
  res.send(images)
})

app.get("/api/images/:imageName", (req, res) => {

  // check if the user is logged in
  // make sure the user has permission to view this image


  // deploy to a cloud service

  // think about: the difference between deploying code, and deploying persisted data. 

  const imageName = req.params.imageName

  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

const __dirname = path.resolve()
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"))
})


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))



