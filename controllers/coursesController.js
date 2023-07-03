const Course = require('../models/Course')
const moment = require('moment');
const { Op } = require('sequelize')

const getCourse = async (req,res)=>{
  try {
    // Ira procurar todos os cursos e so ira mostrar os cursos com data de inicio depois da data atual.
      const currentDate = moment().format('YYYY-MM-DD')
      const course = await Course.findAll({
        where: {
          date: {
            [Op.gte]: currentDate,
          }
        }
      })
      res.json(course);
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
}

// Adiciona um novo curso no banco de dados
const addCourse = async (req,res)=>{
  try {
    const { description, date, studentsAmount } = req.body
    const course = await Course.create({
      description,
      date,
      studentsAmount
    })
    res.json(course)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }  
}

module.exports={getCourse, addCourse}