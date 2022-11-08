import { Controller, UseGuards, Get, UseInterceptors, Request, Param, Query } from '@nestjs/common';
import { Enlace } from './enlace.entity';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody, CrudRequestInterceptor, GetManyDefaultResponse } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { EnlaceService } from './enlace.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { CategoriaService } from '../categoria/categoria.service';
import { TraduccionService } from 'src/traduccion/traduccion.service';
import { FindOperator } from 'typeorm';
// import { VotoService } from 'src/voto/voto.service';

@Crud({
  model: {
    type: Enlace,
  },
  routes: {
    exclude: ['getOneBase', 'createManyBase'],
    deleteOneBase: {
      decorators: [Roles('Medico', 'Administrador'), UseGuards(AuthGuard('jwt'), RolesGuard)],
    },
  },
  query: {
    join: {
      tipo: {
        eager: true,
      },
      categoria: {
        eager: true,
      },
      votos: {
        eager: true,
      },
      usuario: {
        eager: false,
      },
      tags: {
        eager: true,
      },
      listas: {
        eager: true,
      },
    },
  },
})
@ApiTags('enlace')
@Controller('enlace')
export class EnlaceController implements CrudController<Enlace> {

  constructor(public service: EnlaceService, public categoriaService: CategoriaService, public traduccionService: TraduccionService) { }

  get base(): CrudController<Enlace> {
    return this;
  }

  @Override()
  @Roles('Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Enlace,
  ) {
    const baseController = this.base;
    return baseController.createOneBase(req, dto).then(enlace => {
      const promises = dto.traducciones.filter(x => x.texto).map(traduccion => {
        traduccion.idTabla = enlace.id;
        return this.traduccionService.createOne(req, traduccion);
      });
      return Promise.all(promises).then(traducciones => {
        enlace.traducciones = traducciones;
        return enlace;
      });
    });
  }

  @Override()
  @Roles('Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Enlace,
  ) {
    return this.base.replaceOneBase(req, dto).then(enlace => {
      const promises = dto.traducciones.filter(x => x.texto).map(traduccion => {
        traduccion.idTabla = enlace.id;
        req.parsed.paramsFilter[0].value = traduccion.id;
        req.parsed.search = { id: traduccion.id };
        return this.traduccionService.replaceOne(req, traduccion);
      });
      return Promise.all(promises).then(traducciones => {
        enlace.traducciones = traducciones;
        return enlace;
      });
    });
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('byid/:id')
  async getById(@Param() params, @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma) {
    const baseController = this.base;
    return baseController.service.getOne(req)
      .then(enlace => {
        return this.categoriaService.findOne(
          {
            where:
              { id: enlace.categoria.idCategoriaPadre },
          },
        ).then(catPadre => {
          enlace.categoria.padre = Object.assign({}, catPadre);
          return enlace;
        }).then(enl => {
          return this.traduccionService.find(
            {
              where:
                { idTabla: enl.id, idEntidad: 1 },
            },
          ).then(traduccion => {
            enlace.traducciones.push(...traduccion);
            const titulo = traduccion.find(x => x.idCampo === 2 && x.idIdioma == idIdioma);
            if (titulo) {
              enlace.titulo = titulo.texto;
            }
            const url = traduccion.find(x => x.idCampo === 3 && x.idIdioma == idIdioma);
            if (url) {
              enlace.url = url.texto;
            }
            return enlace;
          });
        });
      });
  }

  @Override()
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMany(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma, @Query('rol') rol,
  ) {
    if (!rol) {
      rol = 1;
    }

    let titulo = '';
    if (req.parsed.filter && req.parsed.filter.find(x => x.field === 'titulo')) {
      titulo = req.parsed.filter.find(x => x.field === 'titulo').value;
      req.parsed.filter.splice(req.parsed.filter.findIndex(x => x.field === 'titulo'), 1);
      req.parsed.search.$and.splice(0, 3);
    }

    return this.traduccionService.find(
      {
        where:
          { idEntidad: 1, idCampo: 2, idIdioma, texto: new FindOperator('like', '%' + titulo + '%') },
      },
    ).then(traducciones => {
      if (!traducciones || traducciones.length === 0) {
        return {
          data: [],
          count: 0,
          total: 0,
          page: 0,
          pageCount: 0,
        };
      }

      const idsEnlaces = traducciones.map(a => a.idTabla);
      req.parsed.search.$and.push({ id: { $in: idsEnlaces } });
      req.parsed.filter.push({ field: 'id', operator: '$in', value: idsEnlaces });
      req.parsed.sort.push(
        {
          field: 'patrocinado',
          order: 'DESC',
        },
      );
      if (rol != 1) {
        req.parsed.sort.push(
          {
            field: 'fechaCreacion',
            order: 'DESC',
          },
        );
      } else {
        req.parsed.sort.push(
          {
            field: 'mediaVotos',
            order: 'DESC',
          },
        );
      }

      const enlacesPromise = this.base.service.getMany(req);

      return enlacesPromise
        .then(enlaces => {
          const enlacesAUX =
            !req.parsed.limit && !req.parsed.page ?
              (enlaces as []) :
              (enlaces as GetManyDefaultResponse<Enlace>);
          return enlacesAUX;
        })
        .then(enlaces => {
          const dataEnlaces =
            !req.parsed.limit && !req.parsed.page ?
              (enlaces as []) :
              (enlaces as GetManyDefaultResponse<Enlace>).data;

          if (dataEnlaces instanceof Array) {
            const promises = dataEnlaces.map(enlace => {
              return this.categoriaService.findOne(
                {
                  where:
                    { id: enlace.categoria.idCategoriaPadre },
                },
              ).then(catPadre => {
                enlace.categoria.padre = Object.assign({}, catPadre);
                return enlace;
              }).then(enlace2 => {
                return this.service.findOne(
                  {
                    where:
                      { id: enlace2.id },
                  }
                ).then(enlaceCompleto => {
                  enlace.tags = Object.assign([], enlaceCompleto.tags);
                  return enlace2;
                })
              })
                .then(enlace3 => {
                  return this.traduccionService.find(
                    {
                      where:
                        { idTabla: enlace3.id, idEntidad: 1 },
                    },
                  ).then(traducciones => {
                    enlace3.traducciones.push(...traducciones);
                    const titulo = traducciones.find(x => x.idCampo === 2 && x.idIdioma == idIdioma);
                    if (titulo) {
                      enlace3.titulo = titulo.texto;
                    }
                    const url = traducciones.find(x => x.idCampo === 3 && x.idIdioma == idIdioma);
                    if (url) {
                      enlace3.url = url.texto;
                    }
                    return enlace3;
                  });
                });
            });

            return Promise.all(promises)
              .then(enlacesOrderedArray => {
                if (req.parsed.limit && req.parsed.page) {
                  (enlaces as GetManyDefaultResponse<Enlace>).data = Object.assign([], enlacesOrderedArray);
                  return enlaces;
                }
                return enlacesOrderedArray;
              });
          }
        });
    });
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.deleteOneBase(req)
      .then(() => {
        const idObject: any = req.parsed.search.$and[1];
        return this.traduccionService.find(
          {
            where:
              { idTabla: idObject.id.$eq, idEntidad: 1 },
          },
        )
          .then((traducciones) => {
            return traducciones.map(x => {
              if (req.parsed.search && req.parsed.search.$and) {
                req.parsed.search.$and = [];
                req.parsed.search.$and.push({ id: { $eq: x.id } });
              }
              this.traduccionService.deleteOne(req);
            });
          });
      });
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get('ultimos')
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async ultimos(@ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma) {
    const baseController = this.base;
    req.parsed.sort.push(
      {
        field: 'fechaCreacion',
        order: 'DESC',
      },
    );
    req.parsed.limit = 5;
    return baseController.getManyBase(req)
      .then(enlaces => {
        if (enlaces instanceof Array) {
          const promises = enlaces.map(enlace => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: enlace.id, idEntidad: 1 },
              },
            ).then(traducciones => {
              enlace.traducciones.push(...traducciones);
              const titulo = traducciones.find(x => x.idCampo === 2 && x.idIdioma == idIdioma);
              if (titulo) {
                enlace.titulo = titulo.texto;
              }
              const url = traducciones.find(x => x.idCampo === 3 && x.idIdioma == idIdioma);
              if (url) {
                enlace.url = url.texto;
              }
              return enlace;
            });
          });
          return Promise.all(promises);
        }
      });
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get('mas-votados')
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async masVotados(@ParsedRequest() req, @Query('idIdioma') idIdioma) {
    req.parsed.sort.push(
      {
        field: 'mediaVotos',
        order: 'DESC',
      },
    );
    req.parsed.limit = 5;

    return this.base.service.getMany(req)
      .then(enlaces => {
        if (enlaces instanceof Array) {
          const promises = enlaces.map(enlace => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: enlace.id, idEntidad: 1 },
              },
            ).then(traducciones => {
              enlace.traducciones.push(...traducciones);
              const titulo = traducciones.find(x => x.idCampo === 2 && x.idIdioma == idIdioma);
              if (titulo) {
                enlace.titulo = titulo.texto;
              }
              const url = traducciones.find(x => x.idCampo === 3 && x.idIdioma == idIdioma);
              if (url) {
                enlace.url = url.texto;
              }
              return enlace;
            });
          });
          return Promise.all(promises);
        }
      });
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get('patrocinados')
  @Roles('Publico', 'Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async patrocinados(@ParsedRequest() req, @Query('idIdioma') idIdioma) {
    const baseController = this.base;
    req.parsed.sort.push(
      {
        field: 'fechaCreacion',
        order: 'DESC',
      },
    );
    req.parsed.search = { patrocinado: true };

    return baseController.getManyBase(req)
      .then(enlaces => {
        if (enlaces instanceof Array) {
          const promises = enlaces.map(enlace => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: enlace.id, idEntidad: 1 },
              },
            ).then(traducciones => {
              enlace.traducciones.push(...traducciones);
              const titulo = traducciones.find(x => x.idCampo === 2 && x.idIdioma == idIdioma);
              if (titulo) {
                enlace.titulo = titulo.texto;
              }
              const url = traducciones.find(x => x.idCampo === 3 && x.idIdioma == idIdioma);
              if (url) {
                enlace.url = url.texto;
              }
              return enlace;
            });
          });
          return Promise.all(promises);
        }
      });
  }

}