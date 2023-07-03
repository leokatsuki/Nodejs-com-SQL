const express = require('express')
const router = express.Router()

const courseController = require('../controllers/coursesController')

router.get('/', courseController.getCourse)
router.post('/',courseController.addCourse)

module.exports= router