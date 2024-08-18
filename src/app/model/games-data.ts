import { Game } from "./game";

export interface GamesData {
    data: Game[],
    meta: Pagination
}


interface Pagination {
    page: number;
    pageCount: number;
    pageSize: number;
    total:number
}