import { ISendMailDTO } from "../dtos/ISendMailDTO";
import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private messages: Array<ISendMailDTO>;

  constructor() {
    this.messages = [];
  }

  async sendMail(data: ISendMailDTO): Promise<void> {
    this.messages.push(data);
  }
}

export { MailProviderInMemory };
