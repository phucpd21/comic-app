import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/author';

@Component({
    selector: 'app-ad-author-list',
    templateUrl: './ad-author-list.component.html',
    styleUrls: ['./ad-author-list.component.css']
})
export class AdAuthorListComponent implements OnInit {

    authors: Author[] = [];

    constructor(private authorService: AuthorService) { }

    ngOnInit(): void {
        this.authorService.getsAll().subscribe(data => {
            this.authors = data;
        });
    }

    removeAuthor(authorId: Number) {
        if (confirm('Xóa ngay'))
            this.authorService.delete(authorId).subscribe(res => {
                this.authorService.getsAll().subscribe(data => {
                    this.authors = data;
                })
            })
    }

    search(event:any) {
        let wordsearch = (event.target.value).trim() ? event.target.value : '_'; 
        this.authorService.findByWord(wordsearch).subscribe(data => {
            this.authors = data;
        })
    }

}
