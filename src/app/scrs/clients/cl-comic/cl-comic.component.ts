import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';
import { ComicService } from 'src/app/services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Author } from 'src/app/models/author';
import { ShareDataService } from 'src/app/shares/share-data.service';

@Component({
    selector: 'app-cl-comic',
    templateUrl: './cl-comic.component.html',
    styleUrls: ['./cl-comic.component.css']
})
export class ClComicComponent implements OnInit {

    idSearch!:Number;

    comics: Comic[] = [];

    category: Category = {
        id: 0,
        name: '',
        comics: this.comics
    };

    author: Author = {
        id: 0,
        name: '',
        comics: this.comics
    };

    comic: Comic = {
        id: 0,
        name: 'a',
        image: '',
        cate_id: 0,
        descs: '',
        au_id: 0,
        views: 0,
        chapters: 0,
        status: 1,
        category:this.category,
        author:this.author,
    }

    comicId!: Number;
    constructor(
        private comicService: ComicService,
        private route: ActivatedRoute,
        private router: Router,
        private shareDataService: ShareDataService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.comicId = params.id;
            
            this.comicService.findById(this.comicId).subscribe(data => {
                if (data) {
                    this.comic = data;
                }else this.router.navigate(['/']);
            })
        })
    }

    fomatN(data: Number) {
        let i = data.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(i))
          i = i.replace(pattern, "$1,$2");
        return i;
      }

    

}
