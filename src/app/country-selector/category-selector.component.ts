import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {TagModule} from "primeng/tag";

export type Category = { name: string, type: "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined}

@Component({
  selector: 'category-selector',
  standalone: true,
  imports: [
    NgForOf,
    TagModule,
    NgStyle
  ],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {

  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>()

  public categories: Category[] = [
    { name: 'Chocolates', type: 'info'},
    { name: 'Desserts', type: 'success'},
    { name: 'Drinks', type: 'secondary'},
    { name: 'Snacks', type: 'info'},
    { name: 'Teas', type: 'warning'},
    { name: 'Vegetables', type: 'danger'}
  ];

  public selectedCategoryObject: Category | undefined;

  public selectCategory(category: Category) {
    this.selectedCategoryObject = category;
    this.selectedCategory.emit(this.selectedCategoryObject.name);
  }
}
