import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';
import { ComicService } from 'src/app/services/comic.service';

@Component({
    selector: 'app-ad-comic-list',
    templateUrl: './ad-comic-list.component.html',
    styleUrls: ['./ad-comic-list.component.css']
})
export class AdComicListComponent implements OnInit {

    comics: Comic[] = [];

    constructor(private comicService: ComicService) { }

    ngOnInit(): void {
        this.comicService.getsAll().subscribe(data => {
            this.comics = data;
            console.log(this.comics);
        });
    }

}
