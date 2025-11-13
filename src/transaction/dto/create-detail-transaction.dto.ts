import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateDetailTransactionDto {
  @IsInt()
  @IsNotEmpty()
  menuId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
