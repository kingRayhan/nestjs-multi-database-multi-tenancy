import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tenant extends Document {
  @Prop({ unique: true })
  identifier: string;

  @Prop()
  doamin: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
