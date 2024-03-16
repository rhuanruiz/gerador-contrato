import { Module } from "@nestjs/common";
import { RepresentanteController } from "src/Controllers/RepresentanteController";
import { RepresentanteRepository } from "src/Repositories/RepresentanteRepository";
import { PrismaService } from "src/Services/PrismaService";
import { RepresentanteService } from "src/Services/RepresentanteService";


@Module({
    imports: [],
    controllers: [ RepresentanteController ],
    providers: [ 
        PrismaService,
        RepresentanteService,
        RepresentanteRepository
    ]
})
export class Representante {}
