import { Controller, UseGuards, Query } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CategoriaModule } from './categoria.module';
import { TraduccionModule } from 'src/traduccion/traduccion.module';
import { TraduccionService } from 'src/traduccion/traduccion.service';

@Crud({
    model: {
        type: Categoria,
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
@ApiTags('categoria')
@Controller('categoria')
export class CategoriaController {

  constructor(public service: CategoriaService, public traduccionService: TraduccionService) { }

  get base(): CrudController<Categoria> {
    return this;
  }

  @Override()
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMany(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
  ) {

    const categoriasPromise = this.base.getManyBase(req);

    return categoriasPromise
      .then(categorias => {
        if (categorias instanceof Array) {
          const promises = categorias.map(cat => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: cat.id, idEntidad: 3 },
              },
            ).then(traducciones => {
              cat.traducciones.push(...traducciones);
              const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
              if (nombre) {
                cat.nombre = nombre.texto;
              }
              return cat;
            });
          });
          return Promise.all(promises)
            .then(objs => {
              return objs.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
            });
        }
      });
  }
}
