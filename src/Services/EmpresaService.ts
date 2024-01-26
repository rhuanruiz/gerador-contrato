import { 
    BadRequestException, 
    Injectable, 
    InternalServerErrorException, 
    NotFoundException 
} from "@nestjs/common";
import { EnderecoEmpresa } from "@prisma/client";
import { EmpresaRepository } from "src/Repositories/EmpresaRepository";
import { StringFormatService } from "./StringFormatService";
const consultarCNPJ = require("consultar-cnpj");


@Injectable()
export class EmpresaService {
    constructor( 
        private readonly empresaRepository: EmpresaRepository,
        private readonly stringFormatService: StringFormatService
    ) {}     

    async consultarCnpj(cnpj: string): Promise<any> {

        const empresa = await consultarCNPJ(cnpj);
        if (!empresa) {
            throw new BadRequestException("Este cnpj não existe.")
        }

        const tipo_logradouro = await this.stringFormatService.formatarEndereco(empresa.estabelecimento.tipo_logradouro);
        const logradouro = await this.stringFormatService.formatarEndereco(empresa.estabelecimento.logradouro);
        const complemento = await this.stringFormatService.formatarEndereco(empresa.estabelecimento.complemento);
        const bairro = await this.stringFormatService.formatarEndereco(empresa.estabelecimento.bairro);
        const cidade = await this.stringFormatService.formatarEndereco(empresa.estabelecimento.cidade.nome);
        const cep = await this.stringFormatService.formatarCEP(empresa.estabelecimento.cep);

        const dadosEndereco = {
            tipo_logradouro: tipo_logradouro?.trim(),
            logradouro: logradouro?.replace(/\s+/g, ' ').trim(),
            numero: empresa.estabelecimento.numero?.trim(),
            complemento: complemento?.replace(/\s+/g, ' ').trim(),
            bairro: bairro?.trim(),
            cidade: cidade?.trim(),
            estado: empresa.estabelecimento.estado.sigla?.trim(),
            cep: cep?.trim()
        };

        const telefone = await this.stringFormatService.formatarTelefone(empresa.estabelecimento.telefone1);
        const cnpjFormatado = await this.stringFormatService.formatarCNPJ(cnpj);

        const dadosEmpresa = {
            nome: empresa.razao_social?.toUpperCase().replace(/\s+/g, ' ').trim(),
            ddd: empresa.estabelecimento.ddd1?.trim(),
            telefone: telefone?.replace(/\s+/g, ' ').trim(),
            cnpj: cnpjFormatado,
            enderecoEmpresa: dadosEndereco
        };

        return dadosEmpresa;
    }

    async buscarEmpresa(idEmpresa: number): Promise<any> {
        try {
            return await this.empresaRepository.buscarEmpresa(idEmpresa);
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async buscarEmpresas(): Promise<any> {

        try {
            return await this.empresaRepository.buscarEmpresas();
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async cadastrarEmpresa(dados): Promise<any> {

        const { cnpj } = dados;
        const cnpjFormatado = await this.stringFormatService.formatarCNPJ(cnpj);

        if (await this.empresaRepository.verificarCNPJ(cnpjFormatado)) {
            throw new BadRequestException("Esta empresa já está cadastrada!");
        }

        const dadosEmpresa = await this.consultarCnpj(cnpj);

        try {
            const empresa = await this.empresaRepository.cadastrarEmpresa(dadosEmpresa);
            return empresa;
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async editarEmpresa(
        idEmpresa: number, 
        dadosEmpresa: {
            nome: string,
            ddd: string,
            telefone: string,
            cnpj: string,
            enderecoEmpresa: EnderecoEmpresa
    }): Promise<any> {

        if (!await this.empresaRepository.buscarEmpresa(idEmpresa)) {
            throw new NotFoundException("Não há registros desta empresa.")
        }

        try {
            const empresa = await this.empresaRepository.editarEmpresa(Number(idEmpresa), dadosEmpresa);
            return "Sucesso!";
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async excluirEmpresa(idEmpresa: number): Promise<any> {

        if (!await this.empresaRepository.buscarEmpresa(idEmpresa)) {
            throw new NotFoundException("Não há registros desta empresa.")
        }

        try {
            const empresa = await this.empresaRepository.excluirEmpresa(Number(idEmpresa));
            return "Sucesso!";
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }
}