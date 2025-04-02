import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TableEntity} from './table.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TableEntity]),
  ],
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService],
})
export class TableModule {}
