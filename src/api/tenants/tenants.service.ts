import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: Model<Tenant>,
  ) {}

  create(createTenantDto: CreateTenantDto) {
    const exists = this.tenantModel.findOne({
      identifier: createTenantDto.identifier,
    });
    if (exists) {
      throw new ForbiddenException('Tenant already exists');
    }

    return this.tenantModel.create({
      identifier: createTenantDto.identifier,
      doamin: createTenantDto.domain,
    });
  }

  findAll() {
    return this.tenantModel.find();
  }

  findOne(filter: FilterQuery<Tenant>) {
    return this.tenantModel.findOne(filter);
  }
}
