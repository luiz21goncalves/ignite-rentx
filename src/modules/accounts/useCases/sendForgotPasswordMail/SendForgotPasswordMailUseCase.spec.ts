import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryImMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokesRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/Providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/Providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailPromiderInMemory: MailProviderInMemory;

describe("SendForgotPasswordMailUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailPromiderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailPromiderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailPromiderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "49793480",
      email: "fobca@anzefse.ck",
      name: "Elva Wheeler",
      password: "coI2gfEn",
    });

    await sendForgotPasswordMailUseCase.execute("fobca@anzefse.ck");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("user-not-exists")
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create an users tokens", async () => {
    const createUserToken = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "949095383",
      email: "wiajvu@todutse.eh",
      name: "Frank Webb",
      password: "EopG3CAM",
    });

    await sendForgotPasswordMailUseCase.execute("wiajvu@todutse.eh");

    expect(createUserToken).toHaveBeenCalled();
  });
});
