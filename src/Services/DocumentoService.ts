import {
    Injectable, 
    InternalServerErrorException, 
    NotFoundException 
} from "@nestjs/common";
import { EmpresaService } from "./EmpresaService";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { utcToZonedTime } from 'date-fns-tz';

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const extenso = require('extenso');


@Injectable()
export class DocumentoService {
    constructor(
        private readonly empresaService: EmpresaService
    ) {}

    async gerarDocumento(dados): Promise<any> {

        const data = new Date();
        const fuso_horario= 'America/Sao_Paulo'; 
        const data_fuso = utcToZonedTime(data, fuso_horario);
        const data_atual = format(data_fuso, "d 'de' MMMM 'de' yyyy", { locale: ptBR });

        const {
            idEmpresa,
            dadosRepresentante: {
                nome_representante,
                naturalidade,
                estadoCivil,
                profissao,
                cpf,
                registroGeral: {
                    numero,
                    orgaoExpedidor
                },
                enderecoRepresentante: {
                    enderecoCompleto,
                    cidade, 
                    estado
                }
            },
            dadosDocumento: {
                n_contrato,
                objeto,
                valor,
                funcao,
                sub_funcao,
                programa,
                acao,
                natureza_despesa,
                sub_elemento,
                fonte,
                origem_recurso,
                prazo_exec,
                prazo_exec_tempo,
                prazo_vig,
                prazo_vig_tempo,
                data_base,
                documento_base,
                termo_cooperacao
            }
        } = dados;

        const empresa = await this.empresaService.buscarEmpresa(idEmpresa);
        if (!empresa) {
            throw new NotFoundException("Esta empresa não existe.");
        }

        const valor_extenso = extenso(valor, {mode: 'currency'});
        const prazo_exec_extenso = extenso(prazo_exec, {mode: 'number'});
        const prazo_vig_extenso = extenso(prazo_vig, {mode: 'number'});

        try {
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
                nome_empresa: empresa.nome.toUpperCase(),
                tipo_logradouro: empresa.enderecoEmpresa.tipo_logradouro,
                logradouro: empresa.enderecoEmpresa.logradouro,
                numero_endereco: empresa.enderecoEmpresa.numero,
                complemento: empresa.enderecoEmpresa.complemento,
                bairro: empresa.enderecoEmpresa.bairro,
                cidade_empresa: empresa.enderecoEmpresa.cidade,
                estado_empresa: empresa.enderecoEmpresa.estado,
                cep: empresa.enderecoEmpresa.cep,
                ddd: empresa.ddd,
                telefone: empresa.telefone,
                cnpj: empresa.cnpj,
                //  Representante
                nome_representante: nome_representante.toUpperCase(),
                naturalidade: naturalidade,
                estado_civil: estadoCivil,
                profissao: profissao,
                registro_geral: numero,
                orgao_expedidor: orgaoExpedidor,
                cpf: cpf,
                endereco_representante: enderecoCompleto,
                cidade_representante: cidade,
                estado_representante: estado,
                //  Objeto
                n_contrato: n_contrato,
                objeto: objeto,
                //  Valor Contratual
                valor: valor,
                valor_extenso: valor_extenso,
                //  Recursos Orçamentários
                funcao: funcao,
                sub_funcao: sub_funcao,
                programa: programa,
                acao: acao,
                natureza_despesa: natureza_despesa,
                sub_elemento: sub_elemento,
                fonte: fonte,
                origem_recurso: origem_recurso,
                //  Prazo de Execução
                prazo_exec: prazo_exec,
                prazo_exec_extenso: prazo_exec_extenso,
                prazo_exec_tempo: prazo_exec_tempo,
                //  Prazo de Vigência
                prazo_vig: prazo_vig,
                prazo_vig_extenso: prazo_vig_extenso,
                prazo_vig_tempo: prazo_vig_tempo,
                //  Reajustamento de Preços
                data_base: data_base,
                //  Legislação
                documento_base: documento_base,
                //  Termo de Cooperação
                termo_cooperacao: termo_cooperacao,
                //  Foro
                data_documento: data_atual
            });

            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });

            fs.writeFileSync(path.resolve("src/Templates/contrato_output.docx"), buf);
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }
}