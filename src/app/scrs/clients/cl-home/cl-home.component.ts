import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-cl-home',
  templateUrl: './cl-home.component.html',
  styleUrls: ['./cl-home.component.css']
})
export class ClHomeComponent implements OnInit {

  comics: Comic[] = [];

  totalLength: any;
  page: number = 1;

  constructor(
    private comicService: ComicService,
  ) { }

  ngOnInit(): void {
    this.comicService.getsAll().subscribe(data => {
      this.totalLength = data.length;
      this.comics = data;
    })
  }

  sortOrder() {
    this.comics = this.comics.reverse();
  }

}
