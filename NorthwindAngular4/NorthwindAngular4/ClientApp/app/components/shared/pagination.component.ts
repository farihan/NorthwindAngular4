import { 
	Component,
	Input, 
	Output, 
	EventEmitter }     from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
	selector: 'pagination',
    template: `
    <nav *ngIf="totalRecords > pageSize">
        <ul class="pagination">
            <li [class.disabled]="currentPage == 1">
                <a [routerLink]="['/product-list']" (click)="previous()" aria-label="Previous">
                <span aria-hidden="true">Previous</span>
                </a>
            </li>
            <li [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
                <a [routerLink]="['/product-list']">{{ page }}</a>
            </li>
            <li [class.disabled]="currentPage == pages.length">
                <a [routerLink]="['/product-list']" (click)="next()" aria-label="Next">
                <span aria-hidden="true">Next</span>
                </a>
            </li>
        </ul>
    </nav>  
`
})
export class PaginationComponent implements OnChanges {
    @Input('total-records') totalRecords: number;
	@Input('page-size') pageSize = 10;
	@Output('page-changed') pageChanged = new EventEmitter();
	pages: any[];
	currentPage = 1; 

	ngOnChanges(){
        this.currentPage = 1;
        
        var pagesCount = Math.ceil(this.totalRecords / this.pageSize); 
		    this.pages = [];
		    for (var i = 1; i <= pagesCount; i++)
			    this.pages.push(i);
	}

	changePage(page: number){
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previous(){
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next(){
		if (this.currentPage == this.pages.length)
			return; 
		
		this.currentPage++;
        console.log("next", this);
		this.pageChanged.emit(this.currentPage);
	}
}