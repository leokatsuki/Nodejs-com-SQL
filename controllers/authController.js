const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const RevokedToken = require('../models/RevokedToken');
const Users = require('../models/User')

const login = async(req, res) => {
  try {
    // Pega o username e password da requisicao
    const { username, password } = req.body

    // Procura o user
    const user = await Users.findOne({ where: { username } })
    
    // Se nao achar o usuario, ocorre um erro
    if (!user) {
      return res.status(401).json({ message: 'Usuario invalido' })
    }
    
    // Compara a senha fornecida com a senha criada pelo usuario
    const compareResult = await bcrypt.compare(password, user.password)

    // Se nao for igual, ocorre um errro
    if (!compareResult) {
      return res.status(401).json({ message: 'Senha invalida' })
    }

    // Gera o token
    const token = jwt.sign({id:user.id, username:user.username}, 'secret_key')
    return res.status(200).json({auth:true, token: token})
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const logout = async (req, res) => {
  try {
    // Pega o token da requisicao
    const { token } = req.body;

    // Se nao tiver token, ocorre um erro
    if (!token) {
      return res.status(400).json({ message: 'Token nao foi fornecido' });
    }

    // Ira procurar na tabela RevokedToken o token fornecido
    const existingToken = await RevokedToken.findOne({ where: { token } });

    // Se existir o token na tabela, é porque o token está invalido
    if (existingToken) {
      return res.status(400).json({ message: 'Token ja foi revogado' });
    }

    // Cria uma nova linha no banco de dados com o token para invalida-lo
    const revokedToken = await RevokedToken.create({ token });

    return res.json(revokedToken);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

  module.exports = {login, logout}