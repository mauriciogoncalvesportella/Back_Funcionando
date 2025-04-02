import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MotivoEntity} from "./motivo.entity";
import {MotivoAddDTO, MotivoUpdateDTO} from "./atendimento.dto";
import {Repository} from "typeorm";
import {CadastroServiceInterface} from "src/shared/interfaces";

@Injectable()
export class MotivoService implements CadastroServiceInterface {
  constructor(
    @InjectRepository(MotivoEntity)
    private motivoRepository: Repository<MotivoEntity>,
  ) {}

  async add (data: MotivoAddDTO[]) : Promise<MotivoEntity[]> {
    return await this.motivoRepository.save(data)
  }

  async all () : Promise<MotivoEntity[]> {
    return await this.motivoRepository.find()
  }

  async update (data: MotivoUpdateDTO[]) : Promise<MotivoEntity[]> {
    return await this.motivoRepository.save(data)
  }

  async delete (cd: number) : Promise<void> {
    await this.motivoRepository.delete(cd)
  }

  async nextOrdem () : Promise<number> {
    const maxOrdem = await this.motivoRepository.createQueryBuilder('motivo')
      .select('MAX(motivo.nordem)', 'max')
      .getRawOne()
    return maxOrdem.max == null ? 0 : maxOrdem.max + 1
  }
}
