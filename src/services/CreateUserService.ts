import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'; // Senha criptografada

import User from '../models/User';

interface Resquest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Resquest): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email }, // email: email
    });

    if (checkUserExists) {
      throw new Error('Email addres already used.');
    }

    const hashedPassword = await hash(password, 8); // Senha criptografada

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password; // Assim não retorno a senha do usuario criado

    return user;
  }
}

export default CreateUserService;
