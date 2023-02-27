import { IsOptional } from 'class-validator';

export class CreateCatDto {
  @IsOptional()
  name: string;
}
