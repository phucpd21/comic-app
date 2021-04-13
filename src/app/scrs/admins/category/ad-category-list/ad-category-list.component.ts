import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-ad-category-list',
    templateUrl: './ad-category-list.component.html',
    styleUrls: ['./ad-category-list.component.css']
})
export class AdCategoryListComponent implements OnInit {
    
    categories: Category[] = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.getsAll().subscribe(data => {
            this.categories = data;
        });
    }

    onRemove(cateId: Number) {
        if(confirm('Xóa ngay')) {
            this.categoryService.delete(cateId).subscribe(res => {
                this.categoryService.getsAll().subscribe(res => {
                    this.categories = res;
                });
            });
        }
    }

    search(event:any) {
        let wordsearch = (event.target.value).trim() ? event.target.value : '_'; 
        this.categoryService.findByWord(wordsearch).subscribe(data => {
            this.categories = data;
        })
    }


}
