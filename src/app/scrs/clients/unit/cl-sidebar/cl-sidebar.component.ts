import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Comic } from 'src/app/models/comic';
import { ComicService } from 'src/app/services/comic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cl-sidebar',
    templateUrl: './cl-sidebar.component.html',
    styleUrls: ['./cl-sidebar.component.css']
})
export class ClSidebarComponent implements OnInit {

    comics: Comic[] = [];

    constructor(
        private comicService: ComicService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.comicService.getAll().subscribe(data => {
            if (data) {
                data.sort((a, b) => Number(b.views) - Number(a.views));
                data = data.slice(0, 8)
                this.comics = data;
            }
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
