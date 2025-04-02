import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AtendimentoModule } from 'src/atendimento/atendimento.module';
import { TableService } from 'src/table/table.service';
import {TableModule} from 'src/table/table.module';
import {TableEntity} from 'src/table/table.entity';
import {GrupoAcessoEntity} from './grupoAcesso.entity';

@Module({
  imports: [
    TableModule,
    TypeOrmModule.forFeature([UserEntity, GrupoAcessoEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
