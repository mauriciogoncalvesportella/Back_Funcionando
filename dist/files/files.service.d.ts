import { TicketFilterDTO } from 'src/ticket/ticket.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { Response } from 'express';
import { ChaveEntity } from 'src/chave/chave.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
export declare class FilesService {
    private ticketService;
    private chaveRepository;
    private userRepository;
    constructor(ticketService: TicketService, chaveRepository: Repository<ChaveEntity>, userRepository: Repository<UserEntity>);
    downloadTicketTableCSV(res: Response, user: any, filter: TicketFilterDTO): Promise<void>;
}
