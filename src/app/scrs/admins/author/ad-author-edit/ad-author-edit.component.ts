import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
    selector: 'app-ad-author-edit',
    templateUrl: './ad-author-edit.component.html',
    styleUrls: ['./ad-author-edit.component.css']
})
export class AdAuthorEditComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authorService: AuthorService
    ) { this.FormAuthor = this.CreateFormGroup() }

    FormAuthor: FormGroup;
    author!: Author;
    authorId!: Number;
    validAuthor: Boolean = true;

    ngOnInit(): void {
        this.route.params.subscribe(params => this.authorId = params.id);
        this.authorService.findById(this.authorId).subscribe(data => {
            if (data) {
                this.author = data;
                this.f.name.setValue(data.name);
            }
        });
    }

    CreateFormGroup() {
        return new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ])
        });
    }

    get f() { return this.FormAuthor.controls }

    checkAuthor() {
        this.authorService.findFullWord(this.FormAuthor.value.name).subscribe(data => {
            if (data) {
                if (data.id == this.author.id) {
                    this.validAuthor = true;
                } else {
                    this.validAuthor = false;
                }
            } else this.validAuthor = true;
        });
    }

    onSubmit() {
        this.authorService.findFullWord(this.FormAuthor.value.name).subscribe(data => {
            if (data  && data.id != this.author.id) return;
            this.authorService.update(this.authorId, this.FormAuthor.value).subscribe(res => {
                this.router.navigate(['/admin/author-list']);
            });
        });
    }

}
