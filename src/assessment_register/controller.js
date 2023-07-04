const pool = require("../../config.js");
const queries = require("./queries.js");
const nodemailer = require("nodemailer");

const getAssessmentRegisterById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getAssessmentRegisterById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAssessmentRegisterByUser = (req, res) => {
  const register = req.params.register;
  pool.query(
    queries.getAssessmentRegisterByUser,
    [register],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const getAssessmentRegisterByManager = (req, res) => {
  const manager = req.params.manager;
  pool.query(
    queries.getAssessmentRegisterByManager,
    [manager],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const createAssessmentRegister = (req, res) => {
  const transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "joaovitor.soaresti@outlook.com",
      pass: "Joao@2023",
    },
    tls:  { ciphers: 'SSLv3' },
    service: "Outlook365",
  });

  const {
    id_assessment,
    register,
    date_time,
    emailEmployee,
    nameEmployee,
    emailManager,
    nameManager,
    resultValue,
  } = req.body;

  const date = new Date(date_time).toLocaleString("pt-BR");

  pool.query(
    queries.createAssessmentRegister,
    [id_assessment, register, date_time], async (error, results) => {
    if (error) throw error;
      await sendEmail(
        transport,
        emailEmployee,
        `<div>
          <div style="background: #195BA2; padding: 10px 16px">
            <h1 style="color: #fff">Sistema de Avalição de Desempenho</h1>
          </div>
          <div style="padding: 10px 16px">
            <h2 style="color: #195BA2">Olá!</h2>
            <p>Você recentemente realizou uma avaliação de desempenho anual em conjunto com seu gestor.</p>
            <div>
              <p>
                <span style="color: #195BA2; font-weight: bold">Gestor:</span> ${nameManager} <br>
                <span style="color: #195BA2; font-weight: bold">Colaborador:</span> ${nameEmployee} <br>
                <span style="color: #195BA2; font-weight: bold">Data:</span> ${date}
              </p>
            </div>
            <p>No entanto, notamos que sua avaliação ainda não foi validada. Para garantir a integridade da sua avaliação, é importante que você valide sua avaliação.</p>
            <p>Para fazer isso, por favor, <a href="http://localhost:3000/consult/">clique aqui<a/>. e acesse a área de consulta</p>
            <p>Você também pode consultar seu histórico de avaliações</p>
            <p>Obrigado novamente por sua colaboração e aguardamos sua validação.</p>
            
            <p>Atenciosamente, <br/>Equipe Braste</p>
          </div>
        </div>`
      );

      await sendEmail(
        transport, 
        emailManager,
        `<div>
          <div style="background: #195BA2; padding: 10px 16px">
            <h1 style="color: #fff">Sistema de Avalição de Desempenho</h1>
          </div>
        <div style="padding: 10px 16px">
            <h2 style="color: #195BA2">Olá!</h2>
            <p>Você realizou uma nova avaliação de desempenho!</p>
            <div>
              <p>
                <span style="color: #195BA2; font-weight: bold">Gestor:</span> ${nameManager} <br>
                <span style="color: #195BA2; font-weight: bold">Colaborador:</span> ${nameEmployee} <br>
                <span style="color: #195BA2; font-weight: bold">Data:</span> ${date}
              </p>
            </div>
            <p>Atenciosamente, <br/>Equipe Braste</p>
          </div>
        </div>
        `
      );

      await sendEmail(
        transport,
        "monique.pinheiro@brasterapica.com.br",
        `
        <div>
        <div style="background: #195BA2; padding: 10px 16px">
              <h1 style="color: #fff">Sistema de Avaliação de Desempenho</h1>
        </div>
        <div style="padding: 10px 16px">
              <h2 style="color: #195BA2">Olá!</h2>
              <p>Foi realizada uma nova avaliação de desempenho!</p>
              <div>
                <p>
                  <span style="color: #195BA2; font-weight: bold">Gestor:</span> ${nameManager} <br>
                  <span style="color: #195BA2; font-weight: bold">Colaborador:</span> ${nameEmployee} <br>
                  <span style="color: #195BA2; font-weight: bold">Data:</span> ${date}
                </p>
              </div>
              <p>Atenciosamente, <br/>Equipe Braste</p>
              </div>
        </div>
        `
      );
      res.status(200).json(results.rows[0].id_assessment_register);
  });
};

const sendEmail = async (transport, email, body) => {
  await transport
    .sendMail({
      from: "joaovitor.soaresti@outlook.com",
      to: email,
      subject: "Validação de Avaliação de Desempenho",
      html: body
    });
};

const updateAssessmentRegisterStatus = (req, res) => {
  const id = req.params.id;
  const { date, email } = req.body;

  pool.query(
    queries.updateAssessmentRegisterStatus,
    [date, email, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json();
    }
  );
};

const getAssessmentUsingFilter = (req, res) => {
  const [string] = req.body;
 
  pool.query(
    string,
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getAssessmentRegisterById,
  getAssessmentRegisterByUser,
  createAssessmentRegister,
  updateAssessmentRegisterStatus,
  getAssessmentUsingFilter,
  getAssessmentRegisterByManager
};
