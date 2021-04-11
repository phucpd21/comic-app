import { Comic } from "./comic";

export class Author {
    id:Number;
    name:string;
    comics!:Comic[];

    constructor(id:Number, name:string, comics:Comic[]) {
        this.id = id;
        this.name = name;
        this.comics = comics;
    }
}
