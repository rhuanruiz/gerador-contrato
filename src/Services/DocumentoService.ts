import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { EmpresaService } from "./EmpresaService";
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");


@Injectable()
export class DocumentoService {
    constructor(
        private readonly empresaService: EmpresaService
    ) {}

    async gerarDocumento(idEmpresa: number): Promise<any> {

        const empresa = await this.empresaService.buscarEmpresa(idEmpresa);
        if (!empresa) {
            throw new NotFoundException("Esta empresa não existe.");
        }

        const content = fs.readFileSync(
            path.resolve("src/Templates/contrato_input.docx"),
            "binary"
        );

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        //  Tratar casos que esteja vazio
        doc.render({
            //  Empresa
            nome_empresa: empresa.nome,
            tipo_logradouro: empresa.endereco.tipo_logradouro.toLowerCase(),
            logradouro: empresa.endereco.logradouro.toLowerCase(),
            numero_endereco: empresa.endereco.numero,
            complemento: empresa.endereco.complemento.toLowerCase(),
            bairro: empresa.endereco.bairro.toLowerCase(),
            cidade_empresa: empresa.endereco.cidade,
            estado_empresa: empresa.endereco.estado,
            cep: empresa.endereco.cep,
            ddd: empresa.ddd,
            telefone: empresa.telefone,
            cnpj: empresa.cnpj,
            //  Representante
            /*nome_representante: ,
            naturalidade: ,
            estado_civil: ,
            profissao: ,
            registro_geral: ,
            orgao_expedidor: ,
            cpf: ,
            endereco_representante: ,
            cidade_representante: ,
            estado_representante: ,
            //  Objetivo
            objetivo: ,
            //  Valor Contratual
            valor: ,
            valor_extenso: ,
            //  Recursos Orçamentários
            funcao: ,
            sub_funcao: ,
            programa: ,
            acao: ,
            natureza_despesa: ,
            sub_elemento: ,
            fonte: ,
            //  Prazo de Execução
            prazo_exec: ,
            prazo_exec_extenso: ,
            prazo_exec_tempo: ,
            //  Prazo de Vigência
            prazo_vig: ,
            prazo_vig_extenso: ,
            prazo_vig_tempo: ,
            //  Reajustamento de Preços
            data_base: ,
            //  Legislação
            documento_base: ,
            //  Termo de Cooperação
            termo_cooperacap: ,
            //  Foro
            data_documento:*/
        });

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });

        fs.writeFileSync(path.resolve("src/Templates/contrato_output.docx"), buf);
    }

}