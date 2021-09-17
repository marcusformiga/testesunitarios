import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepository: InMemoryUsersRepository;

describe("ShowProfile", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
  });
  it("Should be able to list one user profile with data", async () => {
    const newUser: ICreateUserDTO = {
      name: "testnamevalid",
      email: "testemail@mail.com",
      password: "testpassword",
    };
    const { id } = await createUserUseCase.execute(newUser);
    const profile = await showUserProfileUseCase.execute(id as string);
    expect(profile).toBeDefined();
    expect(profile).toHaveProperty("email");
    expect(profile).toHaveProperty("name");
  });
  it("Should not to be able to show a no existent  user profile", async () => {
    const newUser = {
      name: "invalidname",
      email: "invalidmail",
      password: "invalidpassword",
    };
    expect(async () => {
      await showUserProfileUseCase.execute("123");
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
