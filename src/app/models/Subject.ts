import { Book } from "./Book";
import { Video } from "./Video";



export interface Subject {
    id: number;
    name: string;
    videos?: Video[]
    books?: Book[]
}