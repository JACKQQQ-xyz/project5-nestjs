import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '@nestjs/passport';



@Controller('transaction')
export class TransactionController {
 constructor(private readonly transactionService: TransactionService) { }


 @Post()
 create(@Body() createTransactionDto: CreateTransactionDto) {
   return this.transactionService.create(createTransactionDto);
 }


 @Get()
 @UseGuards(AuthGuard('jwt'), RoleGuard)
 @Roles('ADMIN')
 findAll() {
   return this.transactionService.findAll();
 }


 @Get(':id')
 @UseGuards(AuthGuard('jwt'), RoleGuard)
 @Roles('ADMIN')
 findOne(@Param('id') id: number) {
   return this.transactionService.findOne(+id);
 }
}
