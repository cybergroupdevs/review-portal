const nodemailer = require('nodemailer');

class mailer{
    constructor(){
    }

    async sendMail(mailObject, password, cb){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: 'false',
            port: '465',
            auth: { 
                user: 'mongmawchetna@gmail.com', // team members allow less secure apps to acees your gmail in settings for functionality to work
                pass: 'mongmaw@chetna21ok' //put your password here
            }
        });
    
        var mailOptions = {
            from: 'vishal.ranjan@cygrp.com',
            to: `<${mailObject.email}>`, // must be Gmail
            cc:`${mailObject.firstName} <${mailObject.email}>`,
            subject: 'Login Credentials to HRMS',
            html: `
                    <p>Hello, ${mailObject.firstName}!! We are pleased to have you join us. Here
                    are your login credentials. </p>
                    <table style="width: 100%; border: none">
                        <thead>
                            <tr style="background-color: #000; color: #fff;">
                                <th style="padding: 10px 0">CGI code</th>
                                <th style="padding: 10px 0">First Name</th>
                                <th style="padding: 10px 0">Last Name</th>
                                <th style="padding: 10px 0">E-mail</th>
                                <th style="padding: 10px 0">Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align: center">${mailObject.cgiCode}</td>
                                <td style="text-align: center">${mailObject.firstName}</td>
                                <td style="text-align: center">${mailObject.lastName}</td>
                                <td style="text-align: center">${mailObject.email}</td>
                                <th style="text-align: center">${password}</th>
                            </tr>
                        </tbody>
                    </table>
                    <p>Greetings from CyberGroup.</p>`
        };
        var status;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                status = false;
                cb(status);
            } 
            else {
                status = true;
                cb(status);
            }
        });
    }
}

module.exports = new mailer();