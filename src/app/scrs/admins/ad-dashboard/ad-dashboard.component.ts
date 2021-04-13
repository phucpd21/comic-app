import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { Comic } from 'src/app/models/comic';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';
import { ComicService } from 'src/app/services/comic.service';

@Component({
    selector: 'app-ad-dashboard',
    templateUrl: './ad-dashboard.component.html',
    styleUrls: ['./ad-dashboard.component.css']
})
export class AdDashboardComponent implements OnInit {
    comics: Comic[] = [];
    categories: Category[] = [];
    authors: Author[] = [];
    views: Number = 0;

    constructor(
        private comicSV: ComicService,
        private categorySV: CategoryService,
        private authorSV: AuthorService
    ) { }

    ngOnInit(): void {
        this.comicSV.getAll().subscribe(data => {
            this.comics = data;
            console.log(this.comics);
            this.comics.map(item => {
                this.views = Number(this.views) + Number(item.views);
            })
        });

        this.categorySV.getAll().subscribe(data => {
            this.categories = data;
        });
        this.authorSV.getAll().subscribe(data => {
            this.authors = data;
        });

    }

    fomatN(data: Number) {
        let i = data.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(i))
            i = i.replace(pattern, "$1,$2");
        return i;
    }

}
