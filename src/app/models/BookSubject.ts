import { Book } from "./Book";

export interface BookSubject {
    id: number;
    name: string;
    playlistId: string;
    books?: Book[]
}