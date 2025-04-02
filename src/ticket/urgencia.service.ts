import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UrgenciaEntity} from "./urgencia.entity";
import {UrgenciaAddDTO, UrgenciaUpdateDTO} from "./ticket.dto";
import {CadastroServiceInterface} from "src/shared/interfaces";

@Injectable()
export class UrgenciaService implements CadastroServiceInterface {
  constructor(
    @InjectRepository(UrgenciaEntity)
    private urgenciaRepository: Repository<UrgenciaEntity>,
  ) {}

  async add (data: UrgenciaAddDTO[]) : Promise<UrgenciaEntity[]> {
    return await this.urgenciaRepository.save(data)
  }

  async all () : Promise<UrgenciaEntity[]> {
    return await this.urgenciaRepository.find()
  }

  async update (data: UrgenciaUpdateDTO[]) : Promise<UrgenciaEntity[]> {
    return await this.urgenciaRepository.save(data) 
  }

  async delete (cd: number) {
    await this.urgenciaRepository.delete(cd)
  }

  async nextOrdem () : Promise<number> {
    const maxOrdem = await this.urgenciaRepository.createQueryBuilder('urgencia')
      .select('MAX(urgencia.nordem)', 'max')
      .getRawOne()
    return maxOrdem.max == null ? 0 : maxOrdem.max + 1
  }
}
