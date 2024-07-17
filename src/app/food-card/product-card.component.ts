import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Product} from "./product";

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    CardModule,
    NgForOf,
    PrimeTemplate,
    NgIf,
    NgStyle
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() public header = '';
  @Input() public product: Product | undefined;
}
