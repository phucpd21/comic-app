import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { ComicService } from 'src/app/services/comic.service';
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-ad-comic-new',
    templateUrl: './ad-comic-new.component.html',
    styleUrls: ['./ad-comic-new.component.css']
})
export class AdComicNewComponent implements OnInit {
    FormComic: FormGroup;
    authors: Author[] = [];
    categories: Category[] = [];
    image!: string;
    validName: Boolean = true;
    downloadURL!: Observable<string>;

    constructor(
        private authorService: AuthorService,
        private comicService: ComicService,
        private categoryService: CategoryService,
        private storage: AngularFireStorage,
        private router: Router,
    ) { this.FormComic = this.CreateFormGroup() }

    ngOnInit(): void {
        this.authorService.getAll().subscribe(data => {
            this.authors = data;
        });
        this.categoryService.getAll().subscribe(data => {
            this.categories = data;
        });
    }

    CreateFormGroup() {
        return new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
            cate_id: new FormControl('', [
                Validators.required
            ]),
            au_id: new FormControl('', [
                Validators.required,
            ]),
            descs: new FormControl(''),
            views: new FormControl(''),
            status: new FormControl('', [
                Validators.required
            ]),
            image: new FormControl('', [
                Validators.required
            ]),
            chapters: new FormControl('', [
                Validators.required
            ]),
        });
    }
    get f() {
        return this.FormComic.controls;
    }

    onSubmit() {
        let word = this.FormComic.value.name.trim() ? this.FormComic.value.name.trim() : '_';
        this.comicService.findFullWord(word).subscribe(data => {
            if (data) return;
            if (this.FormComic.valid && this.validName) {
                this.FormComic.value.image = this.image;
                this.FormComic.value.name = this.FormComic.value.name.trim();
                this.FormComic.value.descs = this.FormComic.value.descs.trim();
                this.comicService.addNew(this.FormComic.value).subscribe(res => {
                    this.router.navigate(['/admin/comic-list']);
                });
            }
        })
    }

    checkName() {
        let wordValue = this.FormComic.value.name.trim() ? this.FormComic.value.name.trim() : '_';
        this.comicService.findFullWord(wordValue).subscribe(data => {
            if (data) {
                this.validName = false;
            } else {
                this.validName = true;
            }
        });
    }

    // uploadImage(event: any) {
    //     var n = Date.now();
    //     const file = event.target.files[0];
    //     const filePath = `Uploads/${n}`;
    //     const fileRef = this.storage.ref(filePath);
    //     const task = this.storage.upload(`Uploads/${n}`, file);
    //     task
    //         .snapshotChanges()
    //         .pipe(
    //             finalize(() => {
    //                 this.downloadURL = fileRef.getDownloadURL();
    //                 this.downloadURL.subscribe(url => {
    //                     this.image = url;
    //                     this.FormComic.value.image = url;
    //                 });
    //             })
    //         ).subscribe(url => {
    //             if (url) { console.log('url 2: ', url) }
    //         });
    // }
    uploadImage(event: any) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            let n: Number = Date.now();
            const formData = new FormData();
            formData.append('file', file);
            formData.append('key', `${n}`);

            this.comicService.uploadFile(formData).subscribe(res => {
                //res = {image: 'link_image'}
                this.image = res.image;
                this.FormComic.value.image = res.image;
            });
        }
    }



}
