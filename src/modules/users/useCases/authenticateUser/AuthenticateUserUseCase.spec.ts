import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let usersRepository: InMemoryUsersRepository;
let createUsersUseCase: CreateUserUseCase;
let authenticateUsersUseCase: AuthenticateUserUseCase;

describe("AuthUser", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUsersUseCase = new CreateUserUseCase(usersRepository);
    authenticateUsersUseCase = new AuthenticateUserUseCase(usersRepository);
  });
  it("Shoul to be able to authenticate an user", async () => {
    let newUser: ICreateUserDTO = {
      name: "testname",
      email: "testmail@mail.com",
      password: "testpassword",
    };
    await createUsersUseCase.execute(newUser);
    let user = {
      email: "testmail@mail.com",
      password: "testpassword",
    };
    let authUser = await authenticateUsersUseCase.execute(user);
    expect(authUser).toBeDefined();
    expect(authUser).toHaveProperty("token");
  });
  it("Should not to be able to authenticate an user if password was invalid", async () => {
    const user = {
      email: "validmeial@mail.com",
      password: "invalidpassword",
    };
    expect(async () => {
      await authenticateUsersUseCase.execute(user);
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
  it("Should not to be able to authenticate an user if email was invalid", async () => {
    const user = {
      email: "invalidemail@mail.com",
      password: "validpassword",
    };
    expect(async () => {
      await authenticateUsersUseCase.execute(user);
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
});
