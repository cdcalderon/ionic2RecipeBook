import {Component, OnInit} from '@angular/core';
import {NavParams, ActionSheetController, AlertController} from "ionic-angular";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements  OnInit{
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController) {

  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i>=0; i--) {
                fArray.removeAt(i);
              }
            }
          }
        },
        {
          text: 'Cancel',
          role: 'calcel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name:'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null) {
              return;
            }

            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required))
          }
        }
      ]
    });
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'difficulty': new FormControl('Medium', Validators.required),
        'ingredients': new FormArray([])
      }
    )
  }
}
