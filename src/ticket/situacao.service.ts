import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SituacaoEntity} from "./situacao.entity";
import {SituacaoAddDTO, SituacaoUpdateDTO} from "./ticket.dto";
import {MotivoUpdateDTO} from "src/atendimento/atendimento.dto";
import {CadastroServiceInterface} from "src/shared/interfaces";

@Injectable()
export class SituacaoService implements CadastroServiceInterface {
  constructor(
    @InjectRepository(SituacaoEntity)
    private situacaoRepository: Repository<SituacaoEntity>,
  ) {}

  async add (data: SituacaoAddDTO[]) : Promise<SituacaoEntity[]> {
    return await this.situacaoRepository.save(data)
  }

  async all () : Promise<SituacaoEntity[]> {
    return await this.situacaoRepository.find()
  }

  async update (data: SituacaoUpdateDTO[]) : Promise<SituacaoEntity[]> {
    return await this.situacaoRepository.save(data)  
  }

  async delete (cd: number) {
    await this.situacaoRepository.delete(cd)
  }

  async nextOrdem () : Promise<number> {
    const maxOrdem = await this.situacaoRepository.createQueryBuilder('situacao')
      .select('MAX(situacao.nordem)', 'max')
      .getRawOne()

    if (maxOrdem.max == null) {
      return 0
    }
    return maxOrdem.max + 1
  }
}
