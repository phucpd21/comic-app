import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cl-header',
  templateUrl: './cl-header.component.html',
  styleUrls: ['./cl-header.component.css']
})
export class ClHeaderComponent implements OnInit {

  categories:Array<Category> = [];
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      console.log(data);
    })
  }

}
