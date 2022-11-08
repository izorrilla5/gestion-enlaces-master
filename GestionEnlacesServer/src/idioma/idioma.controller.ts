import { Controller, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { Idioma } from './idioma.entity';
import { IdiomaService } from './idioma.service';
import { TraduccionService } from 'src/traduccion/traduccion.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Crud({
    model: {
        type: Idioma,
    },
    routes: {
        only: ['getManyBase'],
    },
    query: {
        join: {
            padre: {
                eager: true,
            }
        },
    },
})
@ApiTags('idioma')
@Controller('idioma')
export class IdiomaController {

    constructor(public service: IdiomaService, public traduccionService: TraduccionService) { }

    get base(): CrudController<Idioma> {
        return this;
    }

    @Override()
    @Roles('Publico', 'Medico', 'Administrador')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    getMany(
        @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
    ) {
        const idiomasPromise = this.base.getManyBase(req);

        return idiomasPromise
            .then(idiomas => {
                if (idiomas instanceof Array) {
                    const promises = idiomas.map(idioma => {
                        return this.traduccionService.find(
                            {
                                where:
                                    { idTabla: idioma.id, idEntidad: 7 },
                            },
                        ).then(traducciones => {
                            idioma.traducciones.push(...traducciones);
                            const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
                            if (nombre) {
                                idioma.nombre = nombre.texto;
                            }
                            return idioma;
                        });
                    });
                    return Promise.all(promises);
                }
            });
    }
}
