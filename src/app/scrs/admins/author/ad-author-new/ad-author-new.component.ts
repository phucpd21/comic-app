import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ad-author-new',
    templateUrl: './ad-author-new.component.html',
    styleUrls: ['./ad-author-new.component.css']
})
export class AdAuthorNewComponent implements OnInit {
    FormAuthor: FormGroup;
    authors: Author[] = [];
    validAuthor: Boolean = true;

    constructor (
        private authorService: AuthorService,
        private router: Router
    ) {
        this.FormAuthor = this.CreateFormGroup()
    }
    ngOnInit(): void {}

    CreateFormGroup() {
        return new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ])
        })
    }

    get f() { return this.FormAuthor.controls }

    checkAuthor() {
        this.authorService.findFullWord(this.FormAuthor.value.name).subscribe(data => {
            if (data) this.validAuthor = false;
            else this.validAuthor = true;
        });
    }

    onSubmit() {
        this.authorService.findFullWord(this.FormAuthor.value.name).subscribe(data => {
            if (data) return;
            if (this.FormAuthor.valid && this.validAuthor) {
                this.authorService.addNew(this.FormAuthor.value).subscribe(data => {
                    this.router.navigate(['/admin/author-list']);
                });
            }
        })
    }


}
