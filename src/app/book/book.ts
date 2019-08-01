
// export interface BookProperties {
//     author: string;
//     title: string;
// }

// export interface Book extends BookProperties {
//     id: number;
// }

export interface Book {
    id: number;
    author: string;
    title: string;
};

export type BookProperties = Pick<Book, Exclude<keyof Book, 'id'>>;