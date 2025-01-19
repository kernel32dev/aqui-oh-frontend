import { useEffect, useMemo, useState } from "react";
import * as api from "./api";
import {jwtDecode} from "jwt-decode";

export const authorization = {
    jwtAccessToken: "",
    clearJwtAccessToken: () => {},
};

export type Me = {
    id: string;
    name: string;
    email: string;
    competenciaId: string;
};

export type SetJwts = (jwts: {
    token_access: string;
    token_refresh: string;
} | null) => void;

export function useAuth(): [Me | null, SetJwts] {
    const [jwtAccess, setJwtAccess] = useLocalStorage("jwt_access");
    const [jwtRefresh, setJwtRefresh] = useLocalStorage("jwt_refresh");
    const [me, setMe] = useLocalStorage("me");

    useEffect(() => {
        authorization.jwtAccessToken = jwtAccess;
    }, [jwtAccess]);

    useEffect(() => {
        authorization.clearJwtAccessToken = () => {
            setJwtAccess("");
            setMe("");
        };
    }, []);

    const access = useMemo(() => {
        if (!jwtAccess) return null;
        try {
            const decoded = jwtDecode<Me>(jwtAccess);
            setMe(JSON.stringify(decoded));
            return decoded;
        } catch {
            return null;
        }
    }, [jwtAccess]);

    useEffect(() => {
        if (access) return;
        if (!jwtRefresh) return;
        const accessCopy = access;
        const jwtRefreshCopy = jwtRefresh;
        api.refresh(jwtRefresh).then((response) => {
            if (accessCopy != access || jwtRefreshCopy != jwtRefresh) return;
            setJwtAccess(response.token_access);
            setJwtRefresh(response.token_refresh);
        }).catch((e) => {
            if (accessCopy != access || jwtRefreshCopy != jwtRefresh) return;
            if (e instanceof Response && e.status == 401) {
                setJwtAccess("");
                setJwtRefresh("");
                setMe("");
            }
        });
    }, [access, jwtRefresh]);

    const setJwts: SetJwts = (jwts) => {
        setJwtAccess(jwts?.token_access || "");
        setJwtRefresh(jwts?.token_refresh || "");
        if (jwts) {
            const decoded = jwtDecode<Me>(jwts.token_access);
            setMe(JSON.stringify(decoded));
        } else {
            setMe("");
        }
    };

    return [access, setJwts] as const;
}

function useLocalStorage(key: string) {
    const [value, setValue] = useState(() => localStorage.getItem(key) || "");
    return [value, (newValue: string) => {
        localStorage.setItem(key, newValue);
        setValue(newValue);
    }] as const;
}