export interface IBook {
    _id:string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
    image:string
}

export interface IAddBook{
    title: string;
    author: string;
    genre: string;
    description: string;
    copies: number;
    image:string
}
export type IBookInput = Omit<IBook, "_id">;