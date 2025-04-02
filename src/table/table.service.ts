import {Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TableEntity} from './table.entity';
import {Repository} from 'typeorm';
import {TableCreateDTO, TableDTO} from './table.dto';

@Injectable()
export class TableService {
  constructor (
    @InjectRepository(TableEntity)
    private tableRepository: Repository<TableEntity>,
  ){}

  async getTable (nmtable: string, user) {
    try {
      return await this.tableRepository.findOne({ nmtable: nmtable, cduser: user.cd });
    } catch (err) {
      throw new HttpException(
        err,
        HttpStatus.BAD_REQUEST
      );
    } 
  }

  async setTable (nmtable: string, data: TableCreateDTO, user) {
    try {
      let table = await this.tableRepository.findOne({ nmtable: nmtable, cduser: user.cd });
      
      if (!table) {
        await this.tableRepository.save({
          cduser: user.cd,
          nmtable: nmtable,
          jscontent: data.jscontent,
        })
      } else {
        table.jscontent = data.jscontent;
        await this.tableRepository.save(table);
      }
      return { statusCode: 200 }
    } catch (err) {
      throw new HttpException(
        err,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
