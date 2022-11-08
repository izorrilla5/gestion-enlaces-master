import { Controller, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override, CrudRequest, ParsedRequest, GetManyDefaultResponse, ParsedBody } from '@nestjsx/crud';
import { Lista } from './lista.entity';
import { ListaService } from './lista.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { CategoriaService } from './../categoria/categoria.service';
import { EnlaceService } from './../enlace/enlace.service';
import { TraduccionService } from 'src/traduccion/traduccion.service';
import { FindOperator } from 'typeorm';

@Crud({
  model: {
    type: Lista,
  },
  routes: {
    exclude: ['createManyBase', 'updateOneBase'],
    deleteOneBase: {
      decorators: [Roles('Medico', 'Administrador'), UseGuards(AuthGuard('jwt'), RolesGuard)],
    },
  },
  query: {
    join: {
      categoria: {
        eager: true,
      },
      usuario: {
        eager: true,
      },
      enlaces: {
        eager: true,
      },
      tags: {
        eager: true,
      },
    },
  },
})
@ApiTags('lista')
@Controller('lista')
export class ListaController {

  constructor(public service: ListaService, public categoriaService: CategoriaService,
    public enlaceService: EnlaceService, public traduccionService: TraduccionService) { }

  get base(): CrudController<Lista> {
    return this;
  }

  @Override()
  @Roles('Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Lista,
  ) {
    const baseController = this.base;
    return baseController.createOneBase(req, dto).then(lista => {
      const promises = dto.traducciones.filter(x => x.texto).map(traduccion => {
        traduccion.idTabla = lista.id;
        return this.traduccionService.createOne(req, traduccion);
      });
      return Promise.all(promises).then(traducciones => {
        lista.traducciones = traducciones;
        return lista;
      });
    });
  }

  @Override()
  @Roles('Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Lista,
  ) {
    const baseController = this.base;
    return baseController.replaceOneBase(req, dto).then(lista => {

      const promises = dto.traducciones.filter(x => x.texto).map(traduccion => {
        traduccion.idTabla = lista.id;
        req.parsed.paramsFilter[0].value = traduccion.id;
        req.parsed.search = { id: traduccion.id };
        return this.traduccionService.replaceOne(req, traduccion);
      });
      return Promise.all(promises).then(traducciones => {
        lista.traducciones = traducciones;
        return lista;
      });
    });
  }

  @Override()
  @Roles('Medico', 'Administrador', 'Publico')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getOne(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
  ) {
    const baseController = this.base;
    return baseController.getOneBase(req)
      .then(lista => {
        return this.categoriaService.findOne(
          {
            where:
              { id: lista.categoria.idCategoriaPadre },
          },
        ).then(catPadre => {
          lista.categoria.padre = Object.assign({}, catPadre);
          return lista;
        })
          .then(lista2 => {
            return Promise.all(lista2.enlaces.map(enlace => {
              return this.enlaceService.findOne(
                {
                  where:
                    { id: enlace.id },
                },
              );
            }));
          })
          .then(enlaces => {
            if (enlaces instanceof Array) {
              const promises = enlaces.map(enlace => {
                return this.categoriaService.findOne(
                  {
                    where:
                      { id: enlace.categoria.idCategoriaPadre },
                  },
                ).then(catPadre => {
                  enlace.categoria.padre = Object.assign({}, catPadre);
                  if (enlace.votos && enlace.votos.length > 0) {
                    let sumaVotos: number = 0;
                    enlace.votos.forEach(voto => {
                      sumaVotos = sumaVotos + (+voto.valor);
                    });
                    const mediaVotos = sumaVotos / enlace.votos.length;
                    enlace.mediaVotos = mediaVotos;
                  }
                  return enlace;
                });
              });
              return Promise.all(promises).then(x => {

                return x.sort((a, b) => {
                  if (a.mediaVotos > b.mediaVotos) {
                    return -1;
                  }
                  if (a.mediaVotos < b.mediaVotos) {
                    return 1;
                  }
                  // a must be equal to b
                  return 0;
                });

              });
            }
          })
          .then(enlaces => {
            lista.enlaces = Object.assign([], enlaces);
            return lista;
          })
          .then(listaAux => {
            return this.traduccionService.find(
              {
                where:
                  { idTabla: listaAux.id, idEntidad: 2 },
              },
            ).then(traducciones => {
              listaAux.traducciones.push(...traducciones);
              const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
              if (nombre) {
                listaAux.nombre = nombre.texto;
              }
              return listaAux;
            });
          });
      });
  }

  @Override()
  @Roles('Medico', 'Administrador')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMany(
    @ParsedRequest() req: CrudRequest, @Query('idIdioma') idIdioma,
  ) {

    let nombre = '';
    if (req.parsed.filter && req.parsed.filter.find(x => x.field === 'nombre')) {
      nombre = req.parsed.filter.find(x => x.field === 'nombre').value;
      req.parsed.filter.splice(req.parsed.filter.findIndex(x => x.field === 'nombre'), 1);
      req.parsed.search.$and.splice(0, 3);
    }

    return this.traduccionService.find(
      {
        where:
          { idEntidad: 2, idCampo: 1, idIdioma, texto: new FindOperator('like', '%' + nombre + '%') },
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

      const idsListas = traducciones.map(a => a.idTabla);
      req.parsed.search.$and.push({ id: {$in : idsListas }});
      req.parsed.filter.push({ field: 'id', operator: '$in', value: idsListas });
      const listasPromise = this.base.service.getMany(req);

      return listasPromise
        .then(listas => {
          const listasAUX =
            !req.parsed.limit && !req.parsed.page ?
              (listas as []) :
              (listas as GetManyDefaultResponse<Lista>);
          return listasAUX;
        })
        .then(listas => {
          const dataListas =
            !req.parsed.limit && !req.parsed.page ?
              (listas as []) :
              (listas as GetManyDefaultResponse<Lista>).data;

          if (dataListas instanceof Array) {
            const promises = dataListas.map(lista => {
              return this.categoriaService.findOne(
                {
                  where:
                    { id: lista.categoria.idCategoriaPadre },
                },
              ).then(catPadre => {
                lista.categoria.padre = Object.assign({}, catPadre);
                return lista;
              })
                .then(lista2 => {
                  return Promise.all(lista2.enlaces.map(enlace => {
                    return this.enlaceService.findOne(
                      {
                        where:
                          { id: enlace.id },
                      },
                    );
                  }));
                })
                .then(enlaces => {
                  if (enlaces instanceof Array) {
                    const promises = enlaces.map(enlace => {
                      return this.categoriaService.findOne(
                        {
                          where:
                            { id: enlace.categoria.idCategoriaPadre },
                        },
                      ).then(catPadre => {
                        enlace.categoria.padre = Object.assign({}, catPadre);
                        if (enlace.votos && enlace.votos.length > 0) {
                          let sumaVotos: number = 0;
                          enlace.votos.forEach(voto => {
                            sumaVotos = sumaVotos + (+voto.valor);
                          });
                          const mediaVotos = sumaVotos / enlace.votos.length;
                          enlace.mediaVotos = mediaVotos;
                        }
                        return enlace;
                      });
                    });
                    return Promise.all(promises).then(x => {
                      return x.sort((a, b) => {
                        if (a.mediaVotos > b.mediaVotos) {
                          return -1;
                        }
                        if (a.mediaVotos < b.mediaVotos) {
                          return 1;
                        }
                        // a must be equal to b
                        return 0;
                      });
                    });
                  }
                })
                .then(enlaces => {
                  if (enlaces instanceof Array) {
                    const promises2 = enlaces.map(enlace => {
                      return this.traduccionService.find(
                        {
                          where:
                            { idTabla: enlace.id, idCampo: 2, idIdioma },
                        },
                      ).then(traducciones2 => {
                        enlace.traducciones.push(...traducciones2);

                        const titulo = traducciones2.find(x => x.idCampo === 2 && x.idIdioma == idIdioma);
                        if (titulo) {
                          enlace.titulo = titulo.texto;
                        }
                        const url = traducciones2.find(x => x.idCampo === 3 && x.idIdioma == idIdioma);
                        if (url) {
                          enlace.url = url.texto;
                        }
                        return enlace;
                      });
                    });
                    return Promise.all(promises2);
                  }
                })
                .then(enlaces => {
                  lista.enlaces = Object.assign([], enlaces);
                  return lista;
                })
                .then(listaAux => {
                  return this.traduccionService.find(
                    {
                      where:
                        { idTabla: listaAux.id, idEntidad: 2 },
                    },
                  ).then(traducciones => {
                    listaAux.traducciones.push(...traducciones);
                    const nombre = traducciones.find(x => x.idCampo === 1 && x.idIdioma == idIdioma);
                    if (nombre) {
                      listaAux.nombre = nombre.texto;
                    }
                    return listaAux;
                  });
                });
            });
            return Promise.all(promises)
              .then(listasOrderArray => {
                if (req.parsed.limit && req.parsed.page) {
                  (listas as GetManyDefaultResponse<Lista>).data = Object.assign([], listasOrderArray);
                  return listas;
                }
                return listasOrderArray;
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
              { idTabla: idObject.id.$eq, idEntidad: 2 },
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
}
