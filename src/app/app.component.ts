import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CategorySelectorComponent} from "./country-selector/category-selector.component";
import {map, Subject, switchMap, tap} from "rxjs";
import {Product} from "./food-card/product";
import {ProductCardComponent} from "./food-card/product-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CategorySelectorComponent, ProductCardComponent, NgForOf, ProgressSpinnerModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public products: Product[] | undefined;
  private categorySubject = new Subject<string>();

  constructor(private readonly httpClient: HttpClient) {
    this.categorySubject.pipe(
      switchMap(category =>
        this.httpClient.get<any>(`https://world.openfoodfacts.org/api/v2/search?page_size=10&sort_by=popularity_key&categories_tags=${category}`)
          .pipe(
            map(result =>
              result.products.map((product: any) => new Product(product['product_name'], product['image_front_url']))
            ),
            tap(products => this.products = products)
          )
      )
    ).subscribe();
  }


  public loadTopTenOf(category: string): void {
    console.log('category', category)
    this.products = []
    this.categorySubject.next(category);
  }

  protected readonly String = String;
}
