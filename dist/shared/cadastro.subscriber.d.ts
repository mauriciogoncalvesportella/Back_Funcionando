import { EntitySubscriberInterface, InsertEvent, Connection } from "typeorm";
import { TipoAgendamentoService } from "src/agenda/tpagendamento.service";
import { SituacaoService } from "src/ticket/situacao.service";
import { OrigemService } from "src/atendimento/origem.service";
import { MotivoService } from "src/atendimento/motivo.service";
import { UrgenciaService } from "src/ticket/urgencia.service";
export declare class CadastroSubscriber implements EntitySubscriberInterface {
    private connection;
    private tipoAgendamentoService;
    private situacaoService;
    private origemService;
    private motivoService;
    private urgenciaService;
    private cadastroService;
    constructor(connection: Connection, tipoAgendamentoService: TipoAgendamentoService, situacaoService: SituacaoService, origemService: OrigemService, motivoService: MotivoService, urgenciaService: UrgenciaService);
    beforeInsert(event: InsertEvent<any>): Promise<void>;
    resolveCadastroService(entityName: any): void;
}
