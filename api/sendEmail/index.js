const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    context.res = {
      status: 400,
      body: "Faltan datos en el formulario."
    };
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.MAIL_USER,
    subject: "Nuevo mensaje desde TecnoRed",
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    context.res = {
      status: 200,
      body: "Mensaje enviado correctamente."
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: `Error al enviar el mensaje: ${error.message}`
    };
  }
};
