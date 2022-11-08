import { ITraduccion } from './traduccion';

export interface ITag {
    id: number,
    nombre: string,
    traducciones?: ITraduccion[]
}
