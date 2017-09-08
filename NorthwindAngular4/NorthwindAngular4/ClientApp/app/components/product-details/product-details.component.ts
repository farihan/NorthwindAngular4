import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from './../../services/product.service';

@Component({
    selector: 'productdetails',
    templateUrl: './product-details.component.html'
})

export class ProductDetailsComponent implements OnInit {
    public productId: number;
    public product: any;

    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
        route.params.subscribe(p => {
            this.productId = +p['id'];
            if (isNaN(this.productId) || this.productId <= 0) {
                router.navigate(['/product-list']);
                return;
            }
        });
    }

    ngOnInit() {
        this.populateProduct();
    }

    private populateProduct() {
        this.productService.getProduct(this.productId)
            .subscribe(result => this.product = result,
            err => {
                if (err.status == 404) {
                    this.router.navigate(['/product-list']);
                    return;
                }
            });
    }
}