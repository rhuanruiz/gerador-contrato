import { Controller, Get, Query } from "@nestjs/common";
import { DocumentoService } from "src/Services/DocumentoService";


@Controller("documento")
export class DocumentoController {
    constructor( 
        private readonly documentoService: DocumentoService
    ) {}

    @Get()
    async gerarDocumento(
        @Query("idEmpresa") idEmpresa: number
    ): Promise<any> {
        return this.documentoService.gerarDocumento(Number(idEmpresa));
    }
}