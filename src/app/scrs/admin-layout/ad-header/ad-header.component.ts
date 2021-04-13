import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from 'src/app/services/comic.service';
import { Comic } from 'src/app/models/comic';

@Component({
    selector: 'app-ad-header',
    templateUrl: './ad-header.component.html',
    styleUrls: ['./ad-header.component.css']
})
export class AdHeaderComponent implements OnInit {
    keyword!:any;
    comics: Comic[] = [];
    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private Router: Router,
        private comicService: ComicService,
    ) { }

    ngOnInit(): void { }

    search(event: any) {
        // let keyworkfind = event.target.value ? event.target.value : 'null_null'
        // console.log(keyworkfind)
        // this.comicService.findByWord(keyworkfind).subscribe(data => {
            
        //     this.comics = data;
        //     console.log(this.comics)
        // }, err => {
        //     console.log(err);
        // });
    }

}

