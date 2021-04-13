import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClHeaderComponent } from './scrs/client-layout/cl-header/cl-header.component';
import { ClFooterComponent } from './scrs/client-layout/cl-footer/cl-footer.component';
import { ClHomeComponent } from './scrs/clients/cl-home/cl-home.component';
import { ClientLayoutComponent } from './scrs/client-layout/client-layout.component';
import { AdminLayoutComponent } from './scrs/admin-layout/admin-layout.component';
import { AdHeaderComponent } from './scrs/admin-layout/ad-header/ad-header.component';
import { AdFooterComponent } from './scrs/admin-layout/ad-footer/ad-footer.component';
import { AdSidebarComponent } from './scrs/admin-layout/ad-sidebar/ad-sidebar.component';
import { AdComicListComponent } from './scrs/admins/comic/ad-comic-list/ad-comic-list.component';
import { AdCategoryListComponent } from './scrs/admins/category/ad-category-list/ad-category-list.component';
import { AdCategoryNewComponent } from './scrs/admins/category/ad-category-new/ad-category-new.component';
import { AdCategoryEditComponent } from './scrs/admins/category/ad-category-edit/ad-category-edit.component';
import { AdComicNewComponent } from './scrs/admins/comic/ad-comic-new/ad-comic-new.component';
import { AdComicEditComponent } from './scrs/admins/comic/ad-comic-edit/ad-comic-edit.component';
import { AdAuthorEditComponent } from './scrs/admins/author/ad-author-edit/ad-author-edit.component';
import { AdAuthorListComponent } from './scrs/admins/author/ad-author-list/ad-author-list.component';
import { AdAuthorNewComponent } from './scrs/admins/author/ad-author-new/ad-author-new.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { FormdataComponent } from './scrs/admins/formdata/formdata.component';
import { ClCategoryComponent } from './scrs/clients/cl-category/cl-category.component';
import { ClSidebarComponent } from './scrs/clients/unit/cl-sidebar/cl-sidebar.component';
import { ClItemComicComponent } from './scrs/clients/unit/cl-item-comic/cl-item-comic.component';
import { ClComicComponent } from './scrs/clients/cl-comic/cl-comic.component';

@NgModule({
  declarations: [
    AppComponent,
    ClHeaderComponent,
    ClFooterComponent,
    ClHomeComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    AdHeaderComponent,
    AdFooterComponent,
    AdSidebarComponent,
    AdComicListComponent,
    AdCategoryListComponent,
    AdCategoryNewComponent,
    AdCategoryEditComponent,
    AdComicNewComponent,
    AdComicEditComponent,
    AdAuthorEditComponent,
    AdAuthorListComponent,
    AdAuthorNewComponent,
    FormdataComponent,
    ClCategoryComponent,
    ClSidebarComponent,
    ClItemComicComponent,
    ClComicComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
