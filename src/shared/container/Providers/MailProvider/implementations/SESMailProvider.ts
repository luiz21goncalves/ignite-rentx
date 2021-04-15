import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { ISendMailDTO } from "../dtos/ISendMailDTO";

class SESMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_SES_REGION,
      }),
    });
  }

  async sendMail({
    to,
    subject,
    from,
    path,
    variables,
  }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || "Rentx",
        address: from?.email || "rentx@luizgoncalves.dev",
      },
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
