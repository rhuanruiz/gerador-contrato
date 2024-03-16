import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Empresa } from './Modules/Empresa';
import { Documento } from './Modules/Documento';
import { Representante } from './Modules/Representante';

@Module({
  imports: [
    Empresa,
    Documento,
    Representante
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
