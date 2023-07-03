const Enrollments = require('../models/Enrollment')
const courses = require('../models/Course')

const getEnrollments = async (req,res)=>{
  // Faz uma busca na tabela de inscricoes e retorna todas.
    try {
        const enrollements = await Enrollments.findAll()
        res.json(enrollements)
      } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
      }
}

const addEnrollment = async (req,res)=>{
  // Adiciona uma inscricao com o id de usuario e id do curso
  try {
    const { userId, courseId } = req.body

    const existingEnrollment = await Enrollments.findOne({
      where: {
        userId,
        courseId,
        cancelationDate: null,
      },
    });

    // Se ja existir a inscricao, ocorre um erro
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Usuario ja esta inscrito neste curso!' });
    }

    // Senao, cria uma nova linha na tabela de inscricoes
    const enrollment = await Enrollments.create({
      userId,
      courseId,
      cancelationDate: null,
    })

    // Faz uma busca pelo ID do curso
    const course = await courses.findByPk(courseId)

    // Se nao tiver, ocorre um erro
    if (!course) {
      return res.status(404).json({ message: 'Curso nao encontrado' })
    }

    // Incrementa o numero de estudante no curso.
    course.increment('studentsAmount')
    await course.save()

    res.json(enrollment)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }  
}

const cancelEnrollment = async (req, res) => {
  // Cancela a inscricao do usuario no curso
  try {
    const { enrollmentId } = req.params;
    const enrollment = await Enrollments.findByPk(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ message: 'Inscricao nao encontrada!' });
    }

    if (enrollment.cancelationDate) {
      return res
        .status(400)
        .json({ message: 'Inscricao ja cancelada!' });
    }

    const course = await courses.findByPk(enrollment.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso nao encontrado!' });
    }

    enrollment.cancelationDate = new Date();
    await enrollment.save();

    course.decrement('studentsAmount');
    await course.save();

    return res.status(200).json({ message: 'Inscricao cancelada com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports={getEnrollments, addEnrollment, cancelEnrollment}