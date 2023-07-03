const express = require('express')
const conn = require('./database/conn')
const RevokedToken = require('./models/RevokedToken');
const jwt = require('jsonwebtoken')
const app = express()
const courseRoutes = require('./routes/coursesRoutes')
const enrollmentsRoutes = require('./routes/enrollmentsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const authenticationRoutes = require('./routes/authRoutes')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())


function VerifyJWT(req, res, next) {
  // Pega o token do header da requisicao
  const authorizationHeader = req.headers.authorization;

  // Verifica se contem "bearer" no comeco do header
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(403).json({ auth: false, message: 'No token provided' });
  }

  // Separa 'bearer' do token
  const token = authorizationHeader.split(' ')[1];

  // Verifica se o token ja foi revogado
  RevokedToken.findOne({ where: { token } })
    .then((revokedToken) => {
      if (revokedToken) {
        return res.status(403).json({ auth: false, message: 'Token revoked' });
      }
      jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
          return res.status(403).json({ auth: false, message: 'Invalid token' });
        }
        req.user = user;
        next();
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
}

app.use('/courses', VerifyJWT,courseRoutes)
app.use('/enrollments', VerifyJWT,enrollmentsRoutes)
app.use('/users', usersRoutes)

app.use('/login', authenticationRoutes)
app.use('/logout', authenticationRoutes)

conn.sync({ force: false }) 
  .then(() => {
    console.log('sync OK')
    app.listen(3333,()=>{
      console.log('Server starting')
    })
  })
  .catch((error) => {
    console.error('Error sync:', error)
  })