/*
  Arquivo: server.js
  Descrição: Arquivo de servidor para autenticação e registro de usuários.
  Autor: Bruno Sábio
  Data: Data de Criação
  Site: bsabioinformatica.com.br
  GitHub: https://github.com/sabiobru
  Linkedn: https://www.linkedin.com/in/brunosabio/
*/

const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const config = require('./config');

server.db = router.db;

// Middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

/**
 * Gera um token JWT para o usuário.
 *
 * @param {object} user - O objeto do usuário.
 * @returns {string} O token JWT gerado.
 */
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, config.secret, { expiresIn: '1h' });
}

/**
 * Rota para obter o nome de usuário associado ao token.
 *
 * @param {object} req - O objeto da requisição.
 * @param {object} res - O objeto da resposta.
 * @returns {object} A resposta com o nome de usuário ou mensagem de erro.
 */
server.get('/username', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);

    const user = router.db.get('users').find({ id: decodedToken.id }).value();
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json({ username: user.username });
  } catch (error) {
    console.error('Error during getting username:', error);
    return res.status(500).json({ error: 'Erro ao obter o nome de usuário' });
  }
});

/**
 * Rota para autenticar um usuário.
 *
 * @param {object} req - O objeto da requisição.
 * @param {object} res - O objeto da resposta.
 * @returns {object} A resposta com o token JWT ou mensagem de erro.
 */
server.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = router.db.get('users').find({ username, password }).value();
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken(user);
    return res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Erro durante o login' });
  }
});

/**
 * Rota para registrar um novo usuário.
 *
 * @param {object} req - O objeto da requisição.
 * @param {object} res - O objeto da resposta.
 * @returns {object} A resposta com o novo usuário criado ou mensagem de erro.
 */
server.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = router.db.get('users').find({ username }).value();
    if (existingUser) {
      return res.status(400).json({ error: 'Nome de usuário já existe' });
    }

    const newUser = { id: Date.now(), username, password };
    router.db.get('users').push(newUser).write();

    const token = generateToken(newUser);
    newUser.token = token;

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Erro durante o registro' });
  }
});

// Iniciar o servidor
const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
