import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { Tipo } from './tipo.entity';
import { TipoService } from './tipo.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { TraduccionService } from 'src/traduccion/traduccion.service';

@Crud({
  model: {
    type: Tipo,
  },
  routes: {
    only: ['getManyBase']
  },
})
@ApiTags('tipo')
@Controller('tipo')
export class TipoController {

  constructor(public service: TipoService, public traduccionService: TraduccionService) { }

  get base(): CrudController<Tipo> {
    return this;
  }

  @Override()
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMany(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
  ) {

    const tiposPromise = this.base.getManyBase(req);

    return tiposPromise
      .then(tipos => {
        if (tipos instanceof Array) {
          const promises = tipos.map(tipo => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: tipo.id, idEntidad: 5 },
              },
            ).then(traducciones => {
              tipo.traducciones.push(...traducciones);
              const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
              if (nombre) {
                tipo.nombre = nombre.texto;
              }
              return tipo;
            });
          });
          return Promise.all(promises);
        }
      });
  }

}
