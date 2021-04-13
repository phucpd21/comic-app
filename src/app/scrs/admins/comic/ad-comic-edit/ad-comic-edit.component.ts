import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { ComicService } from 'src/app/services/comic.service';
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Comic } from 'src/app/models/comic';

@Component({
    selector: 'app-ad-comic-edit',
    templateUrl: './ad-comic-edit.component.html',
    styleUrls: ['./ad-comic-edit.component.css']
})
export class AdComicEditComponent implements OnInit {

    FormComic: FormGroup;
    comic!: Comic;
    authors: Author[] = [];
    categories: Category[] = [];
    image!: string;
    validName: Boolean = true;
    idComic!: Number;
    downloadURL!: Observable<string>;

    constructor(
        private authorService: AuthorService,
        private comicService: ComicService,
        private categoryService: CategoryService,
        private storage: AngularFireStorage,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.FormComic = this.CreateFormGroup()
    }

    ngOnInit(): void {
        this.authorService.getAll().subscribe(data => this.authors = data );
        this.categoryService.getAll().subscribe(data => this.categories = data );
        this.route.params.subscribe(params =>  this.idComic = params.id )
        
        this.comicService.findById(this.idComic).subscribe(data => {
            if (data) {
                this.comic = data;
                this.f.name.setValue(data.name);
                this.f.cate_id.setValue(data.cate_id);
                this.f.au_id.setValue(data.au_id);
                this.f.chapters.setValue(data.chapters);
                this.f.status.setValue(data.status);
                this.f.views.setValue(data.views);
                this.f.descs.setValue(data.descs);
                this.image = data.image;
            } else {
                this.router.navigate(['/admin/comic-list']);
            }
        });

    }

    onSubmit() {
        this.comicService.findFullWord(this.FormComic.value.name).subscribe(data => {
            if (data && data.id != this.comic.id) return;
            if (this.FormComic.valid) {
                this.FormComic.value.image = this.image;
                this.comicService.update(this.idComic, this.FormComic.value).subscribe(data => {
                    this.router.navigate(['/admin/comic-list']);
                });
            }
        });
    }

    checkName() {
        let wordValue = this.FormComic.value.name ? this.FormComic.value.name : '_';
        this.comicService.findFullWord(wordValue).subscribe(data => {
            if (data && data.id != this.comic.id) {
                this.validName = false;
            } else {
                this.validName = true;
            }
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
        image: new FormControl(''),
        chapters: new FormControl('', [
            Validators.required
        ]),
    });
    }
    get f() {
        return this.FormComic.controls;
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
