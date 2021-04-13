import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-ad-category-edit',
    templateUrl: './ad-category-edit.component.html',
    styleUrls: ['./ad-category-edit.component.css']
})
export class AdCategoryEditComponent implements OnInit {

    FormCate: FormGroup;
    category!: Category;
    validCate: Boolean = true;
    cateId!: Number;

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private Router: Router
    ) { this.FormCate = this.CreateFormGroup() }

    ngOnInit(): void {
        this.route.params.subscribe(params => this.cateId = params.id);
        this.categoryService.findById(this.cateId).subscribe(data => {
            if (data) {
                this.category = data;
                this.f.name.setValue(data.name);
            } else {
                this.Router.navigate(['/admin/category-list']);
            }
        });
    }

    CreateFormGroup() {
        return new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ])
        })
    }

    get f() { return this.FormCate.controls }

    onSubmit() {
        const wordValue = this.FormCate.value.name.trim() ? this.FormCate.value.name.trim() : '_';
        this.categoryService.findByAllWord(wordValue).subscribe(data => {
            if (data && data.id != this.category.id) return;
            if (this.FormCate.valid) {
                this.categoryService.update(this.cateId, this.FormCate.value).subscribe(data => {
                    this.Router.navigate(['/admin/category-list']);
                });
            }
        });
    }

    checkCate() {
        const wordValue = this.FormCate.value.name.trim() ? this.FormCate.value.name.trim() : '_';
        this.categoryService.findByAllWord(wordValue).subscribe(data => {
            if (data) {
                if (data.id != this.category.id) this.validCate = false;
                else this.validCate = true;
            } else {
                this.validCate = true;
            }
        });
    }

}
