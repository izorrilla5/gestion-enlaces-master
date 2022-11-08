import { Controller, UseGuards, Query } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { TraduccionService } from 'src/traduccion/traduccion.service';

@Crud({
  model: {
    type: Tag,
  },
  routes: {
    only: ['getOneBase', 'getManyBase']
  },
  query: {
    join: {
      enlaces: {
        eager: false,
      },
      listas: {
        eager: false,
      },
    },
  },
})
@ApiTags('tag')
@Controller('tag')
export class TagController {

  constructor(public service: TagService, public traduccionService: TraduccionService) { }

  get base(): CrudController<Tag> {
    return this;
  }

  @Override()
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    const baseController = this.base;
    return baseController.getOneBase(req)
    .then(tag => {
      return this.traduccionService.findOne(
        {
          where:
            { idTabla: tag.id, idEntidad: 4 },
        },
      ).then(traduccion => {
        tag.traducciones.push(traduccion);
        return tag;
      })
    });
  }

  @Override()
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMany(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
  ) {

    const tagsPromise = this.base.getManyBase(req);

    return tagsPromise
      .then(tags => {
        if (tags instanceof Array) {
          const promises = tags.map(tag => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: tag.id, idEntidad: 4 },
              },
            ).then(traducciones => {
              tag.traducciones.push(...traducciones);
              const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
              if (nombre) {
                tag.nombre = nombre.texto;
              }
              return tag;
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
