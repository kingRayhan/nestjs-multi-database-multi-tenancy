import { TenancyModule } from '@needle-innovision/nestjs-tenancy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './api/cat/cat.module';
import { TenantsModule } from './api/tenants/tenants.module';
import { TenantValidator } from './api/tenants/TenantValidator';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/saas-app-root'),
    // TenancyModule.forRoot({
    //   tenantIdentifier: 'X-TENANT-ID',
    //   options: () => {
    //     return {};
    //   },
    //   uri: (tenantId: string) =>
    //     `mongodb://localhost:27017/saas-app-tenant-${tenantId}`,
    // }),
    TenancyModule.forRootAsync({
      imports: [TenantsModule],
      useFactory: async (tenantValidator: TenantValidator) => {
        return {
          tenantIdentifier: 'X-TENANT-ID',
          options: () => {
            return {};
          },
          uri: (tenantId: string) =>
            `mongodb://localhost/test-tenant-${tenantId}`,
          validator: (tenantId: string) =>
            tenantValidator.setTenantId(tenantId),
        };
      },
      inject: [TenantValidator],
    }),
    CatModule,
    TenantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
