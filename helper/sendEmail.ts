require('dotenv').config();


const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export const SendWelcomeEmail = async (email: String) => {
  const msg = {
    to: email,
    from: {
      name: 'Test',
      email: process.env.FROM_ADDRESS // Use the email address or domain you verified above
    },
    subject: 'Welcome to Our Platform!',
      text: 'Thank you for signing up! We are happy to have you on board.',
      html: '<strong>Thank you for signing up! We are happy to have you on board.</strong>',
  };

  try {
    await sgMail.send(msg);
  } 
  catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

