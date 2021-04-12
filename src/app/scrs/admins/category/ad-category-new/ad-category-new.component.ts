import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ad-category-new',
    templateUrl: './ad-category-new.component.html',
    styleUrls: ['./ad-category-new.component.css']
})
export class AdCategoryNewComponent implements OnInit {
    FormCate: FormGroup;
    categories: Category[] = [];
    validCate: Boolean = true;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
    ) {
        this.FormCate = this.CreateFormGroup();
    }
    CreateFormGroup() {
        return new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ])
        })
    }
    get f() {
        return this.FormCate.controls;
    }

    ngOnInit(): void {
        this.categoryService.getAll().subscribe(data => {
            this.categories = data;
            console.log(this.categories);
        });
    }

    onSubmit() {
        if(this.FormCate.valid && this.validCate) {
            this.categoryService.addNew(this.FormCate.value).subscribe(data => {
                this.router.navigate(['/admin/category-list']);
            });
        }
    }

    checkCate() {
        const wordValue = this.FormCate.value.name.trim() ? this.FormCate.value.name : '_';
        this.categoryService.findByAllWord(wordValue).subscribe(data => {
            if (data) {
                this.validCate = false;
            } else {
                this.validCate = true;
            }
        });
    }

}
