import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-ad-category-new',
  templateUrl: './ad-category-new.component.html',
  styleUrls: ['./ad-category-new.component.css']
})
export class AdCategoryNewComponent implements OnInit {
  FormCate: FormGroup;
  constructor(
    private categoryService: CategoryService,
  ) { 
    this.FormCate = this.CreateFormGroup();
  }
  CreateFormGroup() {
    return new FormGroup({
      name: new FormControl('')
    })
  }
  get f() {
    return this.FormCate.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {

      // console.log(this.FormCate.value.name);
      this.categoryService.addNew(this.FormCate.value).subscribe(data=> {
        console.log(data);
      });
  }

}
