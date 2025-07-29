import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePlanRequest {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  type_currency?: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  color?: string;

  @IsNotEmpty()
  @IsNumber()
  time_limit: number;
}
