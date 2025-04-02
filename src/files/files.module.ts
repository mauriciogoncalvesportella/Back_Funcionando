import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {jwtModule} from 'src/auth/auth.module';
import {TicketModule} from 'src/ticket/ticket.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from 'src/user/user.entity';
import {ChaveEntity} from 'src/chave/chave.entity';

@Module({
  imports: [
    jwtModule,
    TicketModule,
    TypeOrmModule.forFeature([
      UserEntity,
      ChaveEntity,
    ]),
  ], 
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
