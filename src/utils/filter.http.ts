import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpFilterException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log(exception);

        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        const status = exception.getStatus();
        const body = exception.getResponse();

        response.status(status).json(body);
    }
}