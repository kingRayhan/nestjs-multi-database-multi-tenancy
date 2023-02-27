import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TenancyModule } from '@needle-innovision/nestjs-tenancy';
import { Cat, CatSchema } from './entities/cat.entity';

@Module({
  imports: [TenancyModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
