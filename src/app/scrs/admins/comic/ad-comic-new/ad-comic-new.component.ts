import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { ComicService } from 'src/app/services/comic.service';
import { Author } from 'src/app/models/author';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { Comic } from 'src/app/models/comic';

@Component({
    selector: 'app-ad-comic-new',
    templateUrl: './ad-comic-new.component.html',
    styleUrls: ['./ad-comic-new.component.css']
})
export class AdComicNewComponent implements OnInit {
    FormComic: FormGroup;
    authors: Author[] = [];
    checkAuthor: Boolean = false;
    image!: string;

    downloadURL!: Observable<string>;

    constructor(
        private authorService: AuthorService,
        private comicService: ComicService,
        private storage: AngularFireStorage
    ) {
        this.FormComic = this.CreateFormGroup();
    }

    CreateFormGroup() {
        return new FormGroup({
            name: new FormControl(''),
            cate_id: new FormControl(),
            au_id: new FormControl(),
            image: new FormControl(''),
            descs: new FormControl(''),
            views: new FormControl(''),
            chapters: new FormControl(''),
        });
    }
    get f() {
        return this.FormComic.controls;
    }

    ngOnInit(): void {
    }

    FindAuthor(event: any) {
        let keyword: string = event.target.value;
        if (keyword) {
            this.authorService.findByWord(keyword).subscribe(data => {
                this.authors = data ? data : [];
                let array2: [] = [];
                let array3 = this.authors.concat(array2);
                if (this.authors != array3) {
                    this.checkAuthor = true;
                } else {
                    this.checkAuthor = false;
                }
            });
        }
    }

    chooseAuthor(event: any) {
        // console.log(event.target.value);
        this.f.au_id.setValue(event.target.innerText);
        this.authors = [];
    }

    onSubmit() {
       
        let fakeObj = {
            name: 'fake_name3',
            cate_id: 1,
            au_id: 1,
            image: "C:\\fakepath\\1595815102f8371e943e34b08de23bfc9fb94ea294_thumbnail_900x.jpg",
            descs: 'mieuta1',
            views: 1,
            chapters:1
        };
        this.comicService.addNew(fakeObj).subscribe(data => {
            console.log('Đã thêm: ', data);
        });
    }

    uploadImage(event: any) {
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `Uploads/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`Uploads/${n}`, file);
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadURL = fileRef.getDownloadURL();
                    this.downloadURL.subscribe(url => {
                        this.image = url;
                        this.FormComic.value.image = url;
                    });
                })
            ).subscribe(url => {
                if (url) { console.log('url 2: ', url) }
            });
    }

    removeImage() {
        // this.FormComic.value.image = '';
    }


}
