import { verify } from 'jsonwebtoken';

const TOKEN_KEY = 'token';
const USER_DATA_KEY = 'user_data';

export function setToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
    setLoggedUserData(token);
}

export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
    removeLoggedUserData();
}

export function isLogged(): boolean {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
        return false;
    }

    try {
        verify(token, 'secretKey');
    } catch (e) {
        if (e && e.name === 'TokenExpiredError'){
            removeToken();
            removeLoggedUserData();
            return false;
        }
    }

    return true;
}

function setLoggedUserData(token: string) {
    const decodedUser = verify(token, 'secretKey');
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(decodedUser));
}

export function getLoggedUserData(): any {
    const decodedUser = sessionStorage.getItem(USER_DATA_KEY);
    if (!decodedUser) {
        return {
            necesitaCambiarContrasena: false,
            nombre: '',
            rol: {
                id: 1
            },
            idIdiomaSeleccionado: 1
        }
    }
    return JSON.parse(decodedUser);
}

function removeLoggedUserData() {
    sessionStorage.removeItem(USER_DATA_KEY);
}
