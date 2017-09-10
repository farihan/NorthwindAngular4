import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

import { Product } from './../../models/product';

import { NotificationService } from './../../services/notification.service';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { SupplierService } from './../../services/supplier.service';

@Component({
    selector: 'productcreate',
    templateUrl: './product-create.component.html'
})

export class ProductCreateComponent implements OnInit {

    public product: any;
    public suppliers: any[];
    public categories: any[];

    constructor(private notificationService: NotificationService, private productService: ProductService, private categoryService: CategoryService, private supplierService: SupplierService, private router: Router) {
        
    }

    ngOnInit() {

        this.product = { discontinued: false, supplierId: '', categoryId: ''};
        //this.product = {
        //    productId: 0,
        //    productName: '',
        //    quantityPerUnit: '',
        //    unitPrice: 0,
        //    unitsInStock: 0,
        //    unitsOnOrder: 0,
        //    reorderLevel: 0,
        //    discontinued: false,
        //    supplierId: '',
        //    categoryId: ''
        //};

        var sources = [
            this.supplierService.getSuppliers(),
            this.categoryService.getCategories(),
        ];

        Observable.forkJoin(sources).subscribe(data => {
            this.suppliers = data[0];
            this.categories = data[1];
        }, error => {
            this.notificationService.error(error);
            });
        
        this.notificationService.info('Product create loaded');
    }

    onSubmit(product: Product, isValid: boolean) {
        if (isValid) {
            console.log(product);
            this.productService.create(this.product)
                .subscribe(result => {
                    this.notificationService.success('Product created');
                    this.router.navigate(['/product-list']);
                }, error => {
                    console.error(error);
                    this.notificationService.error(error);
                });
        }
        else {
            this.notificationService.error('Invalid product');
        }
    }
}