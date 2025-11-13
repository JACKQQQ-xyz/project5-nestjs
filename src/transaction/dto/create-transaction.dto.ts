import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetailTransactionDto } from './create-detail-transaction.dto';

export enum Payment {
  CASH = 'CASH',
  QRIS = 'QRIS',
}

export class CreateTransactionDto {
  @IsEnum(Payment)
  @IsOptional()
  paymentMethod?: Payment = Payment.QRIS; // default QRIS

  @IsString()
  @IsOptional()
  orderName?: string = "";

  @ValidateNested({ each: true })
  @Type(() => CreateDetailTransactionDto)
  @ArrayMinSize(1)
  @IsNotEmpty()
  detail: CreateDetailTransactionDto[];
}
