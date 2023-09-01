import { Module } from '@nestjs/common';
import User from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CountriesModule } from '../countries/countries.module';
import { MailModule } from '../mail/mail.module';
import { UserController } from './controllers/user.controller';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';

@Module({
    imports:[
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' },
      }),
      CountriesModule,
      MailModule,
      TransfusionCentersModule
    ],
    providers: [UsersService, AuthService],
    exports: [UsersService, AuthService],
    controllers: [AuthController, UserController],
})
export class UsersModule {}
