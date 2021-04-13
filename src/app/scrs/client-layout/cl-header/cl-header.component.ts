import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Comic } from 'src/app/models/comic';
import { CategoryService } from 'src/app/services/category.service';
import { ComicService } from 'src/app/services/comic.service';
// import { ShareDataService } from 'src/app/shares/share-data.service';

@Component({
    selector: 'app-cl-header',
    templateUrl: './cl-header.component.html',
    styleUrls: ['./cl-header.component.css']
})
export class ClHeaderComponent implements OnInit {


    categories: Array<Category> = [];
    comics!: Comic[];

    constructor(
        private categoryService: CategoryService,
        private comicService: ComicService,
        // private shareDataService: ShareDataService
    ) { }

    ngOnInit(): void {
        this.categoryService.getsAll().subscribe(data => {
            this.categories = data;
        })
    }

    clickLi() {
        document.querySelector('.list_dropdown_categories')?.classList.add('hide');
        setTimeout(() => {
            document.querySelector('.list_dropdown_categories')?.classList.remove('hide');
        }, 100);
    }

    search(event: any) {
        let word = event.target.value.trim() ? event.target.value.trim() : 'errors_not_found';
        this.comicService.findByWord(word).subscribe(data => {
            if (data) {
                data = data.slice(0, 10);
                this.comics = data;
            } else {
                this.comics = data;
            }
        });
    }

    fomatN(data: Number) {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(Number(data));
    }

    changeClass() {
        document.querySelector('.list-result-comic')?.classList.add('hide');
        setTimeout(() => {
            document.querySelector('.list-result-comic')?.classList.remove('hide');
        }, 100);
    }

    // focusIn() {
    //     document.querySelector('.list-result-comic')?.classList.add('show');
    // }
    // focusOut() {
    //     document.querySelector('.list-result-comic')?.classList.remove('show');
    // }

}
