const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const userRoutes = require("./src/users/routes");
const assessmentRoutes = require("./src/assessment/routes");
const questionRoutes = require("./src/question/routes");
const answerRoutes = require("./src/answer/routes");
const assessmentRegisterRoutes = require("./src/assessment_register/routes");

const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "joaovitor.soaresti@outlook.com",
    pass: "Joao@2023",
  },
});

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/assessment/register", assessmentRegisterRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);

app.post("/api/login", (req, res) => {
  const user = req.body;
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: user },
    "Qt0uUtWUmQ2z5hDzHSf7IG2ET7JUFsL50Po1EHD4A2AuzDrFtYd6UUWWcduAl1a"
  );

  return res.json({ token: token });
});

app.post("/api/decode", (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(
    token,
    "Qt0uUtWUmQ2z5hDzHSf7IG2ET7JUFsL50Po1EHD4A2AuzDrFtYd6UUWWcduAl1a"
  );

  return res.json(decoded);
});

app.post('/api/email', (req, res) => {
  const { email, code } = req.body;

  transport.sendMail({
    from: 'joaovitor.soaresti@outlook.com',
    to: email,
    subject: 'Seu código de acesso ao GP Performance',
    html: `
    <div>
      <div style="background: #195BA2; padding: 10px 16px">
              <h1 style="color: #fff">GP Performance</h1>
      </div>
            <div style="padding: 10px 16px">
              <h2 style="color: #195BA2">Olá!</h2>
              <p>Segue seu código de autenticação.</p>
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

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
