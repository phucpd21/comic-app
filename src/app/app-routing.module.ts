import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './scrs/admin-layout/admin-layout.component';
import { AdDashboardComponent } from './scrs/admins/ad-dashboard/ad-dashboard.component';
import { AdAuthorEditComponent } from './scrs/admins/author/ad-author-edit/ad-author-edit.component';
import { AdAuthorListComponent } from './scrs/admins/author/ad-author-list/ad-author-list.component';
import { AdAuthorNewComponent } from './scrs/admins/author/ad-author-new/ad-author-new.component';
import { AdCategoryEditComponent } from './scrs/admins/category/ad-category-edit/ad-category-edit.component';
import { AdCategoryListComponent } from './scrs/admins/category/ad-category-list/ad-category-list.component';
import { AdCategoryNewComponent } from './scrs/admins/category/ad-category-new/ad-category-new.component';
import { AdComicEditComponent } from './scrs/admins/comic/ad-comic-edit/ad-comic-edit.component';
import { AdComicListComponent } from './scrs/admins/comic/ad-comic-list/ad-comic-list.component';
import { AdComicNewComponent } from './scrs/admins/comic/ad-comic-new/ad-comic-new.component';
import { ClientLayoutComponent } from './scrs/client-layout/client-layout.component';
import { ClDetailComponent } from './scrs/clients/cl-detail/cl-detail.component';
import { ClHomeComponent } from './scrs/clients/cl-home/cl-home.component';

const routes: Routes = [
    {path: "", component: ClientLayoutComponent, children: [
            {path: "", component: ClHomeComponent},
            {path: "detail/:id", component: ClDetailComponent},
        ]
    },
    {path:"admin", component: AdminLayoutComponent, children: [
            {path: "", component: AdDashboardComponent},
            {path: "category-list", component:AdCategoryListComponent},
            {path: "category-new", component:AdCategoryNewComponent},
            {path: "category-edit/:id", component:AdCategoryEditComponent},

            {path: "comic-list", component:AdComicListComponent},
            {path: "comic-new", component:AdComicNewComponent},
            {path: "comic-edit/:id", component:AdComicEditComponent},

            {path: "author-list", component:AdAuthorListComponent},
            {path: "author-new", component:AdAuthorNewComponent},
            {path: "author-edit/:id", component:AdAuthorEditComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
