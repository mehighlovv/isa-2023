import { Module, forwardRef } from '@nestjs/common';
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
import { TermsModule } from '../terms/terms.module';
import { LoyaltiesModule } from '../loyalty/loyalties.module';
import { UsersResolver } from './resolvers/users.resolver';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
    imports:[
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' },
      }),
      CountriesModule,
      LoyaltiesModule,
      MailModule,
      forwardRef(()=>TransfusionCentersModule),
      forwardRef(()=>TermsModule),
    ],
    providers: [
      UsersService, 
      AuthService,
      UsersResolver,
      AuthResolver
    ],
    exports: [UsersService, AuthService],
    controllers: [AuthController, UserController],
})
export class UsersModule {}
