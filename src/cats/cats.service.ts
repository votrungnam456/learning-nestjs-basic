import { Injectable } from '@nestjs/common';
import { Cats } from './cats.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './cats.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cats> {
    const newCat = this.catsRepository.create(createCatDto);
    return this.catsRepository.save(newCat);
  }

  async getAll(): Promise<Cats[]> {
    return this.catsRepository.find({ relations: ['user'] });
  }
}
