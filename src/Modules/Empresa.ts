import { Module } from "@nestjs/common";
import { EmpresaController } from "src/Controllers/EmpresaController";
import { EmpresaRepository } from "src/Repositories/EmpresaRepository";
import { EmpresaService } from "src/Services/EmpresaService";
import { PrismaService } from "src/Services/PrismaService";
import { StringFormatService } from "src/Services/StringFormatService";


@Module({
    imports: [],
    controllers: [ EmpresaController ],
    providers: [ 
        EmpresaService,
        EmpresaRepository,
        PrismaService,
        StringFormatService
    ]
})
export class Empresa {}
