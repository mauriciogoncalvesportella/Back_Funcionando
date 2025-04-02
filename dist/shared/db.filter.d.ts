import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class ForbiddenError extends Error {
    constructor(message: string);
}
export declare class DBExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
