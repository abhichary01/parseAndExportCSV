const express = require('express')
const router = express.Router()
import { uploads } from "../../middleware/multer"
import * as handlers from "./csvUploadHandler"

router.post('/upload', uploads.single('csvFile'), handlers.csvUpload)
router.post('/insert', handlers.csvInsert )
router.get('/getbooks/query',handlers.queryBooks)
router.get('/getallbooks',handlers.getBooks)

export default router
