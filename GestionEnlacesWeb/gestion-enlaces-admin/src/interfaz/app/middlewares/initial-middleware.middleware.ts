import _ from 'lodash'
import { appContext } from 'index'

export interface PostPayload {
  original: any,
  modificar?: any
}

//TODO: esto creo que se puede revisar y quizas borrar
export const middlewareInicial = (store: any) => (next: any) => (action: any) => {
  appContext.logger.log('ACCION INICIADA: ' + action.type)
  let actionTratada = action
  if (action.payload && action.payload.modificar) {
    const payloadPost: PostPayload = {
      original: action.payload,
      modificar: _.cloneDeep(action.payload.modificar)
    }
    actionTratada = {
      type: action.type,
      payload: payloadPost
    }
  }

  if (!action.payload) {
    actionTratada.payload = {}
  }

  next(actionTratada)
  appContext.logger.log('ACCION FINALIZADA: ' + action.type)


}
