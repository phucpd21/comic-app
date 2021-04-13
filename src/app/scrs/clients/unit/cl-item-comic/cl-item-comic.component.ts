import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';

@Component({
  selector: 'app-cl-item-comic',
  templateUrl: './cl-item-comic.component.html',
  styleUrls: ['./cl-item-comic.component.css']
})
export class ClItemComicComponent implements OnInit {
  @Input() comic_item!: Comic;
  constructor() { }

  ngOnInit(): void {
  }

  fomatN(data: Number) {
    let i = data.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(i))
      i = i.replace(pattern, "$1,$2");
    return i;
  }

}
