import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put
} from "@nestjs/common";
import { RepresentanteService } from "src/Services/RepresentanteService";


@Controller("representante")
export class RepresentanteController {
    constructor( 
        private readonly representanteService: RepresentanteService
    ) {}

    @Get()
    async buscarRepresentantes(): Promise<any> {
        return this.representanteService.buscarRepresentantes();
    }

    @Post()
    async cadastrarRepresentante(
        @Body() dados: {
            nome: string,
            naturalidade: string,
            estadoCivil: string,
            profissao: string,
            cpf: string,
            registroGeral
            enderecoRepresentante
        }
    ): Promise<any> {
        return this.representanteService.cadastrarRepresentante(dados);
    }

    @Put(":id")
    async editarRepresentante(
        @Param("id") idRepresentante: string,
        @Body() dados: {
            nome: string,
            naturalidade: string,
            estadoCivil: string,
            profissao: string,
            cpf: string,
            registroGeral
            enderecoRepresentante
        }
    ): Promise<any> {
        return this.representanteService.editarRepresentante(Number(idRepresentante), dados);
    }

    @Delete(":id")
    async excluirRepresentante(
        @Param("id") idRepresentante: number
    ): Promise<any> {
        return this.representanteService.excluirRepresentante(Number(idRepresentante));
    }

}