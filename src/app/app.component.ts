import { Component } from '@angular/core';
import { ShareDataService } from 'src/app/shares/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareDataService]
})
export class AppComponent {
  title = 'comic-app';
}
