import { MonitorService } from './monitor.service';
export declare class MonitorController {
    private monitorService;
    constructor(monitorService: MonitorService);
    monitor(req: any, date: any): Promise<{
        userAtendimentos: import("../user/user.entity").UserEntity[];
        acoes: import("../ticket/acao.entity").AcaoEntity[];
    }>;
}
