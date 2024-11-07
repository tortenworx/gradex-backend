import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import 'dotenv/config';

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secured: true,
  auth: {
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
    const templateFile = readFileSync(
      resolve('.', 'src', 'utils', 'mailer', 'invitation.hbs'),
    ).toString();
    const template = handlebars.compile(templateFile);

    await transport.sendMail({
      from: 'GradeX <galaxa@torten.xyz>',
      to: recipient,
      subject: '[GradeX] Complete your registration',
      text: `Good day! \n\n Your account with GradeX has been created. Please visit the link below to proceed \n\nInvitation Link:\n${invitation_url}`,
      html: template({ first_name: name, invitation_link: invitation_url }),
    });
  } catch (error) {
    throw new Error(error);
  }
}
