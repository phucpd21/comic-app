import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/services/comic.service';

@Component({
    selector: 'app-formdata',
    templateUrl: './formdata.component.html',
    styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {

    constructor(
        private comicService: ComicService
    ) { }

    ngOnInit(): void {
    }

    onUpload(event: any) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            let n:Number = Date.now();
            const formData = new FormData();
            formData.append('file', file);
            formData.append('key', `${n}`);

            this.comicService.uploadFile(formData).subscribe(res => {
                console.log(res);
            });
        }
    }
}
