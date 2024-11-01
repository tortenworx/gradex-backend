import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const transport = nodemailer.createTransport({
  host: 'mail.spacemail.com',
  port: 465,
  secured: true,
  user: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendInvitation(
  name: string,
  recipient: string,
  invitation_url: string,
): Promise<void> {
  try {
    transport.use('compile', hbs());
    await transport.sendMail({
      from: 'GradeX System <no-reply@olivarezcollegetagaytay.edu.ph>',
      to: recipient,
      subject: 'Complete your registration',
      text: `Good day! \n\n Your account with GradeX has been created. Please visit the link below to proceed \n\nInvitation Link:\n${invitation_url}`,
      template: 'invitation',
      context: {
        first_name: name,
        invitation_url,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}
