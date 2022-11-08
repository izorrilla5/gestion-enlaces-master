import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Voto } from './voto.entity';
import { ApiTags } from '@nestjs/swagger';
import { VotoService } from './voto.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { EnlaceService } from 'src/enlace/enlace.service';

@Crud({
    model: {
        type: Voto,
    },
    routes: {
    },
    query: {
        exclude: ['enlace'],
    },
})
@ApiTags('voto')
@Controller('voto')
export class VotoController {

    constructor(public service: VotoService, public enlaceService: EnlaceService) { }

    get base(): CrudController<Voto> {
        return this;
    }

    @Override()
    @Roles('Publico')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    createOne(
      @ParsedRequest() req: CrudRequest,
      @ParsedBody() dto: Voto,
    ) {
      const baseController = this.base;
      return baseController.createOneBase(req, dto)
        .then(voto => {
            return voto;
        })
        .then(voto => {
            this.service.find(
                {
                    where:
                        { idEnlace: voto.idEnlace },
                })
            .then(votos => {
                const sum = votos.reduce((a, b) => a + b.valor, 0);
                const avg = (sum / votos.length) || 0;
               return avg;
            })
            .then(avg => {
                this.enlaceService.findOne(
                    {
                        where:
                            { id: voto.idEnlace },
                    })
                    .then(enlace =>{
                        enlace.mediaVotos = avg;
                        req.parsed.paramsFilter.push({field: "id", operator: "$eq", value: enlace.id });
                        req.parsed.search.$and = [{id: {$eq: enlace.id}}];
                        this.enlaceService.updateOne(req, enlace)
                            .then()
                            .catch(err => console.error(err));
                    })
            })
        })
    }
}
