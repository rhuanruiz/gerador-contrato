import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { get } from "http";
import { DocumentoService } from "src/Services/DocumentoService";
const fs = require("fs");


@Controller("documento")
export class DocumentoController {
    constructor( 
        private readonly documentoService: DocumentoService
    ) {}

    @Post()
    async gerarDocumento(
        @Res() res,
        @Body() dados: {
            dadosEmpresa,
            dadosRepresentante,
            dadosDocumento
        }
    ): Promise<any> {
        await this.documentoService.gerarDocumento(dados);
        const fileStream = fs.createReadStream("src/Templates/contrato_output.docx");
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-disposition', 'attachment; contrato_output.docx');
        return fileStream.pipe(res);
    }
}