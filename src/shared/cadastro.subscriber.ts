import {EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection} from "typeorm";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Logger} from "@nestjs/common";
import {TipoAgendamentoEntity} from "src/agenda/tipoagendamento.entity";
import {MotivoEntity} from "src/atendimento/motivo.entity";
import {SituacaoEntity} from "src/ticket/situacao.entity";
import {TipoAgendamentoService} from "src/agenda/tpagendamento.service";
import { CadastroServiceInterface } from "./interfaces";
import {SituacaoService} from "src/ticket/situacao.service";
import {OrigemService} from "src/atendimento/origem.service";
import {OrigemEntity} from "src/atendimento/origem.entity";
import {MotivoService} from "src/atendimento/motivo.service";
import {UrgenciaService} from "src/ticket/urgencia.service";

@EventSubscriber()
export class CadastroSubscriber implements EntitySubscriberInterface {
  private cadastroService: CadastroServiceInterface;

  constructor(
    @InjectConnection()
    private connection: Connection,
    private tipoAgendamentoService: TipoAgendamentoService,
    private situacaoService: SituacaoService,
    private origemService: OrigemService,
    private motivoService: MotivoService,
    private urgenciaService: UrgenciaService,
  ) {
    connection.subscribers.push(this)
  }

  async beforeInsert (event: InsertEvent<any>) {
    this.resolveCadastroService(event.metadata.name)
    if (this.cadastroService) {
      event.entity.nordem = await this.cadastroService.nextOrdem()
    }
  }

  resolveCadastroService (entityName) : void {
    const services = {
      'SituacaoEntity': this.situacaoService,
      'TipoAgendamentoEntity': this.tipoAgendamentoService,
      'OrigemEntity': this.origemService,
      'MotivoEntity': this.motivoService,
      'UrgenciaEntity': this.urgenciaService,
      'default': null,
    }
    this.cadastroService = services[entityName] || services.default
  }
}
