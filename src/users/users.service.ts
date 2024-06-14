import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Cats } from 'src/cats/cats.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['cats'] });
  }
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: +id },
      relations: ['cats'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  async remove(id: string): Promise<void | string> {
    const user = await this.usersRepository.findOne({ where: { id: +id } });
    const cat = await this.catsRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (cat) {
      this.catsRepository.merge(cat, { ...cat, user: null });
      this.catsRepository.save(cat);
    }
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      return 'User deleted successfully';
    }
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    if (createUserDto.catId) {
      const cat = await this.catsRepository.findOne({
        where: { id: createUserDto.catId },
        relations: ['user'],
      });
      if (cat) {
        if (!cat.user) {
          const newUser = this.usersRepository.create(createUserDto);
          const savedUser = await this.usersRepository.save(newUser);
          this.catsRepository.merge(cat, { ...cat, user: savedUser });
          this.catsRepository.save(cat);
          return 'Create user successfully with cat';
        } else {
          throw new NotFoundException(`this cat has owner already`);
        }
      } else {
        throw new NotFoundException(
          `Cat with id ${createUserDto.catId} not found`,
        );
      }
    } else {
      this.usersRepository.create(createUserDto);
      return 'Create user successfully';
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.usersRepository.findOneBy({ id: updateUserDto.id });
    if (!user) {
      throw new NotFoundException(`User with id ${updateUserDto.id} not found`);
    }
    if (updateUserDto.catId) {
      const cat = await this.catsRepository.findOne({
        where: { id: updateUserDto.catId },
        relations: ['user'],
      });
      if (cat) {
        this.usersRepository.merge(user, updateUserDto);
        this.usersRepository.save(user);
        this.catsRepository.merge(cat, { ...cat, user: user });
        this.catsRepository.save(cat);
        return 'Update user successfully with cat';
      } else {
        throw new NotFoundException(
          `Cat with id ${updateUserDto.catId} not found`,
        );
      }
    } else {
      this.usersRepository.merge(user, updateUserDto);
      this.usersRepository.save(user);
      return 'Update user successfully';
    }
  }
}
