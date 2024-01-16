import { 
    Body, 
    Delete, 
    Param, 
    Post, 
    Put 
} from "@nestjs/common";
import { EmpresaService } from "src/Services/EmpresaService";

export class EmpresaController {
    constructor( 
        private readonly empresaService: EmpresaService
    ) {}


    @Post()
    async cadastrarEmpresa(
        @Body() dados: {
            
        }
    ): Promise<any> {
        return this.empresaService.cadastrarEmpresa(dados);
    }

    @Put()
    async editarEmpresa(
        @Param("id") idEmpresa: number,
        @Body() dados: {
            
        }
    ): Promise<any> {
        return this.empresaService.editarEmpresa(dados);
    }

    @Delete()
    async excluirEmpresa(
        @Param("id") idEmpresa: number
    ): Promise<any> {
        return this.empresaService.excluirEmpresa(Number(idEmpresa));
    }

}