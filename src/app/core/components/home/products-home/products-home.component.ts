import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCart } from 'shared/models/shopping-cart';
@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
   }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();

  }

  private populateProducts() {
    this.productService.getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }


}
