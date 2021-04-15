import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';
import { ComicService } from 'src/app/services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
    selector: 'app-ad-comic-list',
    templateUrl: './ad-comic-list.component.html',
    styleUrls: ['./ad-comic-list.component.css']
})
export class AdComicListComponent implements OnInit {

    comics: Comic[] = [];
    categories: Category[] = [];
    authors: Author [] = [];

    cate_id: Number = 0;
    au_id: Number = 0;
    wordsearch: string = '';
    views_status: string = '';
    

    
    constructor(
        private comicService: ComicService,
        private authorService: AuthorService,
        private categoryService: CategoryService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.comicService.getsAllbyTable(this.cate_id, this.au_id).subscribe(data => {
            this.comics = data;
        });
        this.authorService.getAll().subscribe(data => {
            this.authors = data;
        });
        this.categoryService.getAll().subscribe(data => {
            this.categories = data;
        });
        
    }

    onRemove(id: Number) {
        if (confirm('Xóa ngay')) {
            this.comicService.delete(id).subscribe(data => {
                this.comicService.getsAllbyTable(this.cate_id, this.au_id).subscribe(data => {
                    this.comics = data;
                });
            });
        }
    }

    search(event: any) {
        let word = event.target.value.trim() ? event.target.value : '';
        this.wordsearch = word;
        console.log('word: ', this.wordsearch,'cate_id: ', this.cate_id, 'au_id: ', this.au_id, 'view_status: ', this.views_status );
        console.log('_______________________________________________');
        this.comicService.findByWord(word, this.cate_id, this.au_id, this.views_status).subscribe(data => {
            this.comics = data;
        });
    }

    fomatN(data: Number) {
        let i = data.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(i))
            i = i.replace(pattern, "$1,$2");
        return i;
    }

    sortByCategory(event:any) {
        let cateId = event.target.value;
        
        if(cateId) {
            this.cate_id = cateId;
            this.comicService.findByWord(this.wordsearch, cateId, this.au_id, this.views_status).subscribe(data => {
                this.comics = data;
            });
        } else {
            this.cate_id = 0;
            this.comicService.findByWord(this.wordsearch, cateId, this.au_id, this.views_status).subscribe(data => {
                this.comics = data;
            });
        }

        console.log('word: ', this.wordsearch,'cate_id: ', this.cate_id, 'au_id: ', this.au_id, 'view_status: ', this.views_status );
        console.log('_______________________________________________');
        
    }
    sortByAuthor(event:any) {
        let authorId = event.target.value;

        if(authorId) {
            this.au_id = authorId;
            this.comicService.findByWord(this.wordsearch, this.cate_id, authorId, this.views_status).subscribe(data => {
                this.comics = data;
            });
        } else {
            this.au_id = 0;
            this.comicService.findByWord(this.wordsearch, this.cate_id, authorId, this.views_status).subscribe(data => {
                this.comics = data;
            });
        }
        console.log('word: ', this.wordsearch,'cate_id: ', this.cate_id, 'au_id: ', this.au_id, 'view_status: ', this.views_status );
        console.log('_______________________________________________');
    }

    sortByViews(event:any) {
        let views = event.target.value;

        if(views) {
            this.views_status = views;
        } else {
            this.views_status = '';
        }
        
        this.comicService.findByWord(this.wordsearch, this.cate_id, this.au_id, views).subscribe(data => {
            this.comics = data;
        });

        console.log('word: ', this.wordsearch,'cate_id: ', this.cate_id, 'au_id: ', this.au_id, 'view_status: ', this.views_status );
        console.log('_______________________________________________');
    }

    setValueInputSeacrch(event:any) {

    }

}
