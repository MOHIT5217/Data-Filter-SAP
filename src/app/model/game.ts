export interface Game {
    id?: number;
    attributes: Attributes;
}

interface Attributes {
    firstReleaseDate: Date;
    name: string;
    rating: number;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}
