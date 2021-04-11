import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';


@Component({
  selector: 'app-ad-author-new',
  templateUrl: './ad-author-new.component.html',
  styleUrls: ['./ad-author-new.component.css']
})
export class AdAuthorNewComponent implements OnInit {
  FormAuthor: FormGroup;
  authors: Author[] = []; 
  
  constructor(
    private authorService: AuthorService,
  ) { 
    this.FormAuthor = this.CreateFormGroup()
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
    return this.FormAuthor.controls;
  }

  ngOnInit(): void {
    this.authorService.getAll().subscribe(data => {
      this.authors = data;
      console.log(this.authors);
    })
  }

  onSubmit() {
    if(this.FormAuthor.valid) {
      this.authorService.addNew(this.FormAuthor.value).subscribe(data => {
        console.log(data);
      });
    }
  }




}
