import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let createUserRepositoryInMemory: InMemoryUsersRepository;

describe("CreateUsers", () => {
  beforeEach(() => {
    createUserRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(createUserRepositoryInMemory);
  });
  it("should be able to create a new user", async () => {
    // arrange
    const user = {
      name: "testvalidname",
      email: "testvalidmail@mail.com",
      password: "validpassword",
    };
    // action
    const createUser = await createUserUseCase.execute(user);
    // assertion
    expect(createUser).toBeDefined();
    expect(createUser).toHaveProperty("name");
    expect(createUser).toHaveProperty("id");
  });
  it("should not to be able to create a new user if email in use", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "testvalidname",
        email: "testvalidmail@mail.com",
        password: "validpassword",
      });
      await createUserUseCase.execute({
        name: "testvalidname2",
        email: "testvalidmail@mail.com",
        password: "validpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
