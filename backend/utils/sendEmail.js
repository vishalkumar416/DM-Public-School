import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"D.M. Public School" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error: ', error);
    return { success: false, error: error.message };
  }
};

export const sendAdmissionConfirmationEmail = async (admission) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>D.M. Public School</h1>
          <p>Garahi, Desari, Vaishali, Bihar</p>
        </div>
        <div class="content">
          <h2>Admission Application Received</h2>
          <p>Dear ${admission.fatherName},</p>
          <p>We have received your admission application for <strong>${admission.firstName} ${admission.lastName}</strong> for class <strong>${admission.classApplied}</strong>.</p>
          <p><strong>Application Number:</strong> ${admission.applicationNumber}</p>
          <p>Your application is currently under review. We will notify you once it has been processed.</p>
          <p>Please keep this application number for future reference.</p>
        </div>
        <div class="footer">
          <p>D.M. Public School<br>Contact: 7352737650</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email: admission.fatherEmail || admission.motherEmail,
    subject: 'Admission Application Received - D.M. Public School',
    html
  });
};

export const sendAdmissionApprovalEmail = async (admission, student) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .success { background: #d1fae5; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Admission Approved!</h1>
        </div>
        <div class="content">
          <div class="success">
            <h2>Congratulations!</h2>
            <p>Your admission application has been approved.</p>
          </div>
          <p>Dear ${admission.fatherName},</p>
          <p>We are pleased to inform you that the admission of <strong>${student.firstName} ${student.lastName}</strong> has been approved.</p>
          <p><strong>Admission Number:</strong> ${student.admissionNumber}</p>
          <p><strong>Class:</strong> ${student.class} - ${student.section}</p>
          <p>Please visit the school office to complete the remaining admission formalities.</p>
        </div>
        <div class="footer">
          <p>D.M. Public School<br>Contact: 7352737650</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    email: admission.fatherEmail || admission.motherEmail,
    subject: 'Admission Approved - D.M. Public School',
    html
  });
};








