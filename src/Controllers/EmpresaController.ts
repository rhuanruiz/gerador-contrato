import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put
} from "@nestjs/common";
import { EmpresaService } from "src/Services/EmpresaService";


@Controller("empresa")
export class EmpresaController {
    constructor( 
        private readonly empresaService: EmpresaService
    ) {}

    @Get()
    async buscarEmpresas(): Promise<any> {
        return this.empresaService.buscarEmpresas();
    }

    @Post()
    async cadastrarEmpresa(
        @Body() dados: {
            cnpj: String
        }
    ): Promise<any> {
        return this.empresaService.cadastrarEmpresa(dados);
    }

    @Put(":id")
    async editarEmpresa(
        @Param("id") idEmpresa: string,
        @Body() dados: {
            nome: string,
            ddd: string,
            telefone: string,
            cnpj: string,
            enderecoEmpresa
        }
    ): Promise<any> {
        return this.empresaService.editarEmpresa(Number(idEmpresa), dados);
    }

    @Delete(":id")
    async excluirEmpresa(
        @Param("id") idEmpresa: number
    ): Promise<any> {
        return this.empresaService.excluirEmpresa(Number(idEmpresa));
    }

}