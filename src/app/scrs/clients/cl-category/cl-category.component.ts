import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cl-category',
  templateUrl: './cl-category.component.html',
  styleUrls: ['./cl-category.component.css']
})
export class ClCategoryComponent implements OnInit {

  cate:Category = new Category(0,'',[]); 
  cateId!: Number;

  constructor(
    private ComicCategoryServices: CategoryService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if(params.id) {
        this.cateId = params.id;
        this.ComicCategoryServices.findById(this.cateId).subscribe(data => {
          this.cate = data;
          // console.log(this.cate);
        });
      }
    })
  }
  
  sortOrder(event:any) {
    this.cate.comics = this.cate.comics.reverse();
  }

}
