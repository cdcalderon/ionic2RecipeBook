import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../service/shopping-list";
import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'page-tabs',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

}
