var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'horaanchal17@gmail.com',
    pass: 'aanncchhaall'
  }
});

var mailOptions = {
  from: 'horaanchal17@gmail.com',
  to: 'horaanchal@gmail.com',
  subject: 'Login credentials',
  text: `Please login using these credentials.Your password is 843795`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});