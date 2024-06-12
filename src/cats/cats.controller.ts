import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './cats.dto';
import { Cats } from './cats.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cats> {
    return this.catService.create(createCatDto);
  }

  @Get()
  async getAll(): Promise<Cats[]> {
    return this.catService.getAll();
  }
}
