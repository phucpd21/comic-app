import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';
import { ComicService } from 'src/app/services/comic.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-ad-comic-list',
    templateUrl: './ad-comic-list.component.html',
    styleUrls: ['./ad-comic-list.component.css']
})
export class AdComicListComponent implements OnInit {

    comics: Comic[] = [];
    constructor(
        private comicService: ComicService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.comicService.getsAll().subscribe(data => {
            this.comics = data;
        });
    }

    onRemove(id: Number) {
        if (confirm('Xóa ngay')) {
            this.comicService.delete(id).subscribe(data => {
                this.comicService.getsAll().subscribe(data => {
                    this.comics = data;
                })
            });
        }
    }

    search(event:any) {
        let wordsearch = (event.target.value).trim() ? event.target.value : '_'; 
        this.comicService.findByWord(wordsearch).subscribe(data => {
            this.comics = data;
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
