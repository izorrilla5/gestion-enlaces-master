import { Controller, Query, UseGuards } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { Rol } from './rol.entity';
import { RolService } from './rol.service';
import { ApiTags } from '@nestjs/swagger';
import { TraduccionService } from 'src/traduccion/traduccion.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Crud({
  model: {
    type: Rol,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@ApiTags('rol')
@Controller('rol')
export class RolController {

  constructor(public service: RolService, public traduccionService: TraduccionService) { }

  get base(): CrudController<Rol> {
    return this;
  }

  @Override()
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getOne(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
  ) {
    const baseController = this.base;
    return baseController.getOneBase(req)
    .then(rol => {
      return this.traduccionService.find(
        {
          where:
            { idTabla: rol.id, idEntidad: 6 },
        },
      ).then(traducciones => {
        rol.traducciones.push(...traducciones);
        const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
        if (nombre) {
          rol.nombre = nombre.texto;
        }
        return rol;
      });
    });
  }

  @Override()
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMany(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
  ) {

    const rolesPromise = this.base.getManyBase(req);

    return rolesPromise
      .then(roles => {
        if (roles instanceof Array) {
          const promises = roles.map(rol => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: rol.id, idEntidad: 6 },
              },
            ).then(traducciones => {
              rol.traducciones.push(...traducciones);
              const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
              if (nombre) {
                rol.nombre = nombre.texto;
              }
              return rol;
            });
          });
          return Promise.all(promises);
        }
      });
  }

}
