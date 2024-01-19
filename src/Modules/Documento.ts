import { Module } from "@nestjs/common";
import { DocumentoController } from "src/Controllers/DocumentoController";
import { EmpresaRepository } from "src/Repositories/EmpresaRepository";
import { DocumentoService } from "src/Services/DocumentoService";
import { EmpresaService } from "src/Services/EmpresaService";
import { PrismaService } from "src/Services/PrismaService";

@Module({
    imports: [],
    controllers: [ DocumentoController ],
    providers: [ 
        PrismaService,
        DocumentoService,
        EmpresaService,
        EmpresaRepository
    ]
})
export class Documento {}
