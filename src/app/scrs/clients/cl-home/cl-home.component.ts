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

  constructor(
    private comicService: ComicService,
  ) { }

  ngOnInit(): void {
    this.comicService.getsAll().subscribe(data => {
      this.comics = data;
    })
  }

  sortOrder() {
    this.comics = this.comics.reverse();
  }

}
