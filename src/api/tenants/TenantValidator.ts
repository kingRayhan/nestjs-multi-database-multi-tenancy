import { TenancyValidator } from '@needle-innovision/nestjs-tenancy';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from 'src/api/tenants/entities/tenant.entity';

@Injectable()
export class TenantValidator implements TenancyValidator {
  private _tenantId: string;

  // This`Tenant` model definition schema is mapped to the common database and
  // not into the tenant database.
  constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

  /**
   * Method to set the tenant id
   *
   * @param {string} tenantId
   * @returns
   * @memberof CustomTenantValidator
   */
  setTenantId(tenantId: string): TenancyValidator {
    this._tenantId = tenantId;
    return this; // Make sure to return the instance of the class back here.
  }

  /**
   * Your Custom Validation to verify if tenant exist in the common database
   *
   * Note: This method will be invoked by the library internally when
   * tenant id is present in the context.
   *
   * @returns {Promise<void>}
   * @memberof CustomTenantValidator
   */
  async validate(): Promise<void> {
    const exist = await this.tenantModel.exists({ identifier: this._tenantId });
    if (!exist) {
      throw new NotFoundException(
        `Tenant with identifier ${this._tenantId} does not exist`,
      );
    }
  }
}
