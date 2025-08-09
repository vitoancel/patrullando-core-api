export class BaseDto<T> {
  success: boolean = true;
  data?: T;
}
