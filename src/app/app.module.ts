import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";
import {RecipesPage} from "../pages/recipes/recipes";
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {ShoppingListService} from "../service/shopping-list";
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {RecipesService} from "../service/recipes";
import {RecipePage} from "../pages/recipe/recipe";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    RecipesPage,
    ShoppingListPage,
    EditRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    RecipesPage,
    ShoppingListPage,
    EditRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService
  ]
})
export class AppModule {}
