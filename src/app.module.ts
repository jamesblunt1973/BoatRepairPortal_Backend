import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: '1234',
  database: 'BoatDB',
  options: {
    encrypt: false,
    enableArithAbort: true
    },
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CompaniesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    })
  ],
})
export class AppModule { }
