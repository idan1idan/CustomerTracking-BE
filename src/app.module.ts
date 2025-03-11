import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './appointment/appointment.module';
import { PackageModule } from './package/package.module';
import { TransactionModule } from './transaction/transaction.module';
import { StorageModule } from './storage/storage.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        synchronize: process.env.NODE_ENV !== 'production',
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
      }),
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
