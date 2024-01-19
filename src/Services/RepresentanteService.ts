import { 
    BadRequestException, 
    Injectable, 
    InternalServerErrorException, 
    NotFoundException 
} from "@nestjs/common";
import { EnderecoRepresentante, RegistroGeral } from "@prisma/client";
import { RepresentanteRepository } from "src/Repositories/RepresentanteRepository";


@Injectable()
export class RepresentanteService {
    constructor( 
        private readonly representanteRepository: RepresentanteRepository
    ) {}

    async buscarRepresentantes(): Promise<any> {
        try {
            return await this.representanteRepository.buscarRepresentantes();
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async cadastrarRepresentante(
        dadosRepresentante: {
            nome: string,
            naturalidade: string,
            estadoCivil: string,
            profissao: string,
            cpf: string,
            registroGeral: RegistroGeral
            enderecoRepresentante: EnderecoRepresentante
    }): Promise<any> {
        try {
            const representante = await this.representanteRepository.cadastrarRepresentante(dadosRepresentante);
            return representante;
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async editarRepresentante(
        idRepresentante: number, 
        dadosRepresentante: {
            nome: string,
            naturalidade: string,
            estadoCivil: string,
            profissao: string,
            cpf: string,
            registroGeral: RegistroGeral
            enderecoRepresentante: EnderecoRepresentante
    }): Promise<any> {

        if (!await this.representanteRepository.buscarRepresentante(idRepresentante)) {
            throw new NotFoundException("Não há registros deste representante.")
        }

        try {
            const representante = await this.representanteRepository.editarRepresentante(Number(idRepresentante), dadosRepresentante);
            return "Sucesso!";
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async excluirRepresentante(idRepresentante: number): Promise<any> {

        if (!await this.representanteRepository.buscarRepresentante(idRepresentante)) {
            throw new NotFoundException("Não há registros desta empresa.")
        }

        try {
            const empresa = await this.representanteRepository.excluirRepresentante(Number(idRepresentante));
            return "Sucesso!";
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

}