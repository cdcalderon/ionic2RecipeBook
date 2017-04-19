import {Component, OnInit} from '@angular/core';
import {NavParams, ActionSheetController, AlertController, ToastController} from "ionic-angular";
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
              private alertController: AlertController,
              private toastCtrl: ToastController) {

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
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were deleted!',
                duration: 1500,
                position: 'bottom'
              });

              toast.present();
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
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1500,
                position: 'bottom'
              });

              toast.present();
              return;
            }

            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required))

            const toast = this.toastCtrl.create({
              message: 'Item Added',
              duration: 1500,
              position: 'bottom'
            });

            toast.present();
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
