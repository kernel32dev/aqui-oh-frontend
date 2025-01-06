import { authorization } from "./auth";

const baseURL = '/api';

export const signin = (body: {name: string, email: string, password: string}) =>
    POST('/signin', body, null) as Promise<{
        id: string,
        name: string,
        email: string,
        competenciaId: string | null,
        token_refresh: string,
        token_access: string,
    }>;

export const signoff = (body: {email: string, password: string}) =>
    POST('/signoff', body, null) as Promise<void>;

export const login = (body: {email: string, password: string, competencia: true}) =>
    POST('/login', body, null) as Promise<{
        id: string,
        name: string,
        email: string,
        competenciaId: string,
        token_refresh: string,
        token_access: string,
    }>;

export const refresh = (refreshToken: string) =>
    POST('/refresh', {}, refreshToken) as Promise<{
        token_refresh: string,
        token_access: string,
    }>;

async function POST(url: string, body: object, token?: string | null) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token !== null) {
        headers['Authorization'] = `Bearer ${token || authorization.jwtAccessToken}`;
    }
    const response = await fetch(baseURL + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        if (response.status == 401) {
            authorization.clearJwtAccessToken();
        }
        throw response;
    }
    if (response.headers.get('Content-Type')?.startsWith('application/json')) {
        return response.json();
    } else {
        return response;
    }
}
