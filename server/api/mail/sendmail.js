const nodemailer = require('nodemailer'),

transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
    secure: true, // use SSL
    auth: {
      user: 'contact@careershine.in',
      pass: 'Bala@2759'
    }
  }),
EmailTemplate = require('email-templates').EmailTemplate,
path = require('path'),
Promise = require('bluebird');

// Thank you!


function sendEmail (obj) {
  return transporter.sendMail(obj);
}

function loadTemplate (templateName, contexts) {
  let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
  return Promise.all(contexts.map((context) => {
    return new Promise((resolve, reject) => {
      template.render(context, (err, result) => {
        if (err) reject(err);
        else resolve({
          email: result,
          context,
        });
      });
    });
  }));
}

export function sendmail(templ, data) {
  console.log(data);

  loadTemplate(templ, data).then((results) => {
    return Promise.all(results.map((result) => {
      sendEmail({
        to: 'contact@careershine.in',
        from: '"careershine" <contact@careershine.in>',
        subject: result.email.subject,
        html: result.email.html,
        text: result.email.text,
      });
    }));
  }).then(() => {
    console.log('Message Sent');
  });
}
