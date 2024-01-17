import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Empresa } from './Modules/Empresa';

@Module({
  imports: [
    Empresa
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
