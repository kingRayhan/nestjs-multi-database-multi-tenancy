import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  identifier: string;

  @IsOptional()
  domain: string;
}
