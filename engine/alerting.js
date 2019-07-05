'use strict';

const nodemailer = require('nodemailer');
const log = require('../loggers/loggers').default;
let smptHost = process.env.SMTP_HOST;
let smtpPort = process.env.SMTP_PORT;
let smtpUser = process.env.SMTP_USER;
let smtpPws = process.env.SMTP_PWD;
let isMailAlertinActive = process.env.EMAIL_ALERTING_ENABLED || false;
let mailingList = process.env.EMAIL_LIST;

log.info(`Smtp host : ${smptHost}`);
log.info(`Smtp smtpPort : ${smtpPort}`);
log.info(`Smtp user : ${smtpUser}`);
log.info(`Smtp pwd : ${smtpPws}`);

let checkDev = async () => {
  if (process.env.NODE_ENV == 'dev') {
    log.info('Dev profile is active, using ethereal email test account');
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    smptHost = 'smtp.ethereal.email';
    smtpPort = 587;
    smtpUser = testAccount.user;
    smtpPws = testAccount.pass;
  }
};

let transporter;
checkDev().then(() => {
  transporter = nodemailer.createTransport({
    host: smptHost,
    port: smtpPort,
    secure: smtpPort == 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPws
    }
  });
});

let sendEmail = async (subject, text) => {
  if (isMailAlertinActive) {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <hurricane-scheduler@pioardi.com>', // sender address
      to: mailingList, // list of receivers
      subject: subject, // Subject line
      text: text // plain text body
    });
    log.info('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    log.debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

module.exports = {
  sendEmail: sendEmail
};
