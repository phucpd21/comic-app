import { Author } from "./author";
import { Category } from "./category";

export class Comic {
    id: Number;
    name: string;
    cate_id: Number;
    image: string;
    descs: string;
    au_id: Number;
    views: Number;
    chapters: Number;
    status: Number;

    author!: Author;
    category!: Category;

    constructor(id: Number, name: string, cate_id: Number, image: string, descs: string, au_id: Number, views: Number, chapters: Number, status: Number, author: Author, category: Category) {
        this.id = id;
        this.name = name;
        this.cate_id = cate_id;
        this.image = image;
        this.descs = descs;
        this.au_id = au_id;
        this.views = views;
        this.chapters = chapters;
        this.status = status;

        this.author = author;
        this.category = category;
    }

}
