import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './appointment/appointment.module';
import { PackageModule } from './package/package.module';
import { TransactionModule } from './transaction/transaction.module';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      synchronize: process.env.NODE_ENV !== 'production',
      database: 'photo-me',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    CustomerModule,
    AppointmentModule,
    PackageModule,
    TransactionModule,
    StorageModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
