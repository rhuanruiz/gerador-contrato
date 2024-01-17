import { Module } from "@nestjs/common";
import { EmpresaController } from "src/Controllers/EmpresaController";
import { EmpresaRepository } from "src/Repositories/EmpresaRepository";
import { EmpresaService } from "src/Services/EmpresaService";
import { PrismaService } from "src/Services/PrismaService";

@Module({
    imports: [],
    controllers: [ EmpresaController ],
    providers: [ 
        EmpresaService,
        EmpresaRepository,
        PrismaService
    ]
})
export class Empresa {}
