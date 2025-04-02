import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TipoAgendamentoEntity} from "./tipoagendamento.entity";
import {Repository} from "typeorm";
import {TipoAgendamentoAddDTO, TipoAgendamentoUpdateDTO} from "./agenda.dto";
import {CadastroServiceInterface} from "src/shared/interfaces";

@Injectable()
export class TipoAgendamentoService implements CadastroServiceInterface {
  constructor(
    @InjectRepository(TipoAgendamentoEntity)
    private tipoAgendamentoRepository: Repository<TipoAgendamentoEntity>,
  ) {}

  async add (data: TipoAgendamentoAddDTO[]) : Promise<TipoAgendamentoEntity[]> {
    const entities = data.map(entity => this.tipoAgendamentoRepository.create(entity))
    return await this.tipoAgendamentoRepository.save(entities)
  }

  async all () : Promise<TipoAgendamentoEntity[]> {
    return await this.tipoAgendamentoRepository.find()
  }

  async update (data: TipoAgendamentoUpdateDTO[]) : Promise<TipoAgendamentoEntity[]> {
    return await this.tipoAgendamentoRepository.save(data)
  }

  async delete (cd: number) {
    await this.tipoAgendamentoRepository.delete(cd)
  }

  async nextOrdem () : Promise<number> {
    const maxOrdem = await this.tipoAgendamentoRepository.createQueryBuilder('tipoagendamento')
      .select('MAX(tipoagendamento.nordem)', 'max')
      .getRawOne()

    if (maxOrdem.max == null) {
      return 0
    }
    return maxOrdem.max + 1
  }
}
