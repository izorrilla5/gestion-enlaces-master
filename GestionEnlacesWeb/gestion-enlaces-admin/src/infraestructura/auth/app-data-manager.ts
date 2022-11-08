import { ITag } from 'dominio/tag';
import { IRol } from 'dominio/rol';

const IDIOMAS_KEY = 'idiomas';
const MEDICOS_KEY = 'medicos';
const CATEGORIAS_KEY = 'categorias';
const TIPOS_KEY = 'tipos';
const TAGS_KEY = 'tags';
const ROLES_KEY = 'roles';

export function setIdiomas(idiomas) {
    localStorage.setItem(IDIOMAS_KEY, JSON.stringify(idiomas));
}

export function getIdiomas()  {
    const idiomas = localStorage.getItem(IDIOMAS_KEY);
    return idiomas ? JSON.parse(idiomas) : [];
}

export function setMedicos(medicos) {
    localStorage.setItem(MEDICOS_KEY, JSON.stringify(medicos));
}

export function getMedicos()  {
    const medicos = localStorage.getItem(MEDICOS_KEY);
    return medicos ? JSON.parse(medicos) : [];
}

export function setCategorias(categorias) {
    localStorage.setItem(CATEGORIAS_KEY, JSON.stringify(categorias));
}

export function getCategorias()  {
    const categorias = localStorage.getItem(CATEGORIAS_KEY);
    return categorias ? JSON.parse(categorias) : [];
}

export function setTipos(tipos) {
    localStorage.setItem(TIPOS_KEY, JSON.stringify(tipos));
}

export function getTipos()  {
    const tipos = localStorage.getItem(TIPOS_KEY);
    return tipos ? JSON.parse(tipos) : [];
}

export function setTags(tags) {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
}

export function getTags(): ITag[]  {
    const tags = localStorage.getItem(TAGS_KEY);
    return tags ? JSON.parse(tags) : [];
}

export function setRoles(roles) {
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
}

export function getRoles(): IRol[]  {
    const roles = localStorage.getItem(ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
}