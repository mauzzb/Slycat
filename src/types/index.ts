export interface User {
    id: number;
    username: string;
    email: string;
    token: string;
    avatar: string | null;
}

export interface Game {
    id: number;
    nazvanie: string;
    tsena: number;
    opisanie: string;
    kartinka: string;
    razrabotchik: string;
    izdatel: string;
    dataVyhoda: string;
    zhanr: string;
    tegi: string;
    trebovaniya: string;
}

export interface WishlistItem {
    id: number;
    polzovatelId: number;
    igraId: number;
    dobavleno: string;
    igra: Game | null;
}

export interface CartItem {
    id: number;
    polzovatelId: number;
    igraId: number;
    dobavleno: string;
    igra: Game | null;
}

export interface UserGame {
    id: number;
    polzovatelId: number;
    igraId: number;
    kupleno: string;
    ustanovlena: boolean;
    vremyaIgry: number;
    igra: Game | null;
}