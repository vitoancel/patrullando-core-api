export class BaseResponse<T> {
    message: string = '';
    status: boolean = true;
    code: number = 200;
    data?: T; // Propiedad genérica para los datos
  }