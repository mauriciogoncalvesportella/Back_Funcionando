import {Catch, HttpException, ArgumentsHost, ExceptionFilter, Logger, ForbiddenException} from "@nestjs/common";
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError";
import {Request, Response} from "express";
import {QueryFailedError} from "typeorm";


export class ForbiddenError extends Error {
  constructor (message: string) {
    super(message)
    this.name = "ForbiddenError"
  }
}

@Catch(EntityNotFoundError, QueryFailedError)
export class DBExceptionFilter implements ExceptionFilter {
  catch (exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    let status: number
    const code = exception.code

    if (exception instanceof ForbiddenException) {
      status = 403
    } else if (exception instanceof EntityNotFoundError) {
      status = 404
    } else if (exception instanceof QueryFailedError) {
      switch (code) {
        case 'ER_DUP_ENTRY': status = 409; break;
        case 'ER_NO_REFERENCED_ROW_2': status = 404; break;
        default: status = 400; break;
      }
    } else {
      status = 400
    }
    Logger.error(exception.stack)
    response.status(status).json({
      exception
    })
  }
}
