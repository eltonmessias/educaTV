import { Video } from "./Video";



export interface Subject {
    id: number;
    name: string;
    videos: Video[]
}