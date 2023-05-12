const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const nodemailer = require('nodemailer');

const userRoutes = require('./src/users/routes');
const assessmentRoutes = require('./src/assessment/routes');
const questionRoutes = require('./src/question/routes'); 
const answerRoutes = require('./src/answer/routes'); 

const transport = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SEND_EMAIL,
    pass: process.env.SEND_EMAIL_PASSWORD
  }
});

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);

app.post('/api/email', (req, res) => {
  const { email, code } = req.body;

  transport.sendMail({
    from: 'app@brasterapica.com.br',
    to: email,
    subject: 'Seu código de acesso Avaliação de Desempenho',
    html: `
    <div>
      <div style="background: #195BA2; padding: 10px 16px">
              <h1 style="color: #fff">Sistema de Avalição de Desempenho</h1>
      </div>
            <div style="padding: 10px 16px">
              <h2 style="color: #195BA2">Olá!</h2>
              <p>Segue seu código de autenticação ao Sistema de Validação de Desempenho.</p>
              <p style="font-size: 42px; color: #195BA2; font-weight: bold">${code}<p/>
              <p>Atenciosamente, <br/>Equipe Braste</p>
            </div>
    </div>
    `,
    text: 'Código de Autenticação ${code}'
  }).then((response) => {
    res.status(200).json(response);
  });
});

app.listen(port, ()=>{
  console.log(`Servidor rodando na porta ${port}`);
});