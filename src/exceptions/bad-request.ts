import { HttpException } from "./root";

export class BadRequestException extends HttpException {
  constructor(message: string, errors: any) {
    super(400, message, errors);
  }
}
