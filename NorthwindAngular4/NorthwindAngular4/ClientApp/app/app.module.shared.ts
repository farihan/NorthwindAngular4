import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from "ng2-toasty";

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

import { NotificationService } from './services/notification.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { SupplierService } from './services/supplier.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        PaginationComponent,
        ProductListComponent,
        ProductDetailsComponent,
        ProductCreateComponent,
        ProductUpdateComponent,
        ProductDeleteComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'product-list', component: ProductListComponent },
            { path: 'product-create', component: ProductCreateComponent },
            { path: 'product-details/:id', component: ProductDetailsComponent },
            { path: 'product-update/:id', component: ProductUpdateComponent },
            { path: 'product-delete/:id', component: ProductDeleteComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        NotificationService,
        ProductService,
        CategoryService,
        SupplierService
    ]
})
export class AppModuleShared {
}
