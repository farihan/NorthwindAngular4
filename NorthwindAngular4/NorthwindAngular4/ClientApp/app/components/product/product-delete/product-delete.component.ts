﻿import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

import { Product } from './../../../models/product';

import { NotificationService } from './../../../services/notification.service';
import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { SupplierService } from './../../../services/supplier.service';

@Component({
    selector: 'productdelete',
    templateUrl: './product-delete.component.html'
})

export class ProductDeleteComponent implements OnInit {
    suppliers: any[];
    categories: any[];
    public productId: number;
    public product: any;

    constructor(private notificationService: NotificationService, private productService: ProductService, private categoryService: CategoryService, private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) {
        route.params.subscribe(p => {
            this.productId = +p['id'];
            if (isNaN(this.productId) || this.productId <= 0) {
                router.navigate(['/product-list']);
                return;
            }
        });
    }

    ngOnInit() {

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

        this.populateProduct();
    }

    private populateProduct() {
        this.productService.getProduct(this.productId)
            .subscribe(result => {
                this.product = result;
                this.notificationService.info('Product delete loaded');
            },
            error => {
                this.notificationService.error(error);
            });
    }

    onSubmit(product: Product, isValid: boolean) {
        if (isValid) {
            this.productService.delete(this.product)
                .subscribe(result => {
                    this.notificationService.success('Product deleted');
                    this.router.navigate(['/product-list']);
                }, error => {
                    this.notificationService.error(error);
                });
        }
        else {
            this.notificationService.error('Invalid product');
        }
    }
}