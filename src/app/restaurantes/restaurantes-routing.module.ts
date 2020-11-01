import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestauranteAddComponent } from './restaurante-add/restaurante-add.component';
import { RestauranteEditComponent } from './restaurante-edit/restaurante-edit.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';

const routes: Routes = [
  { path: '', component: RestaurantesComponent },
  { path: 'add', component: RestauranteAddComponent },
  { path: 'edit/:id', component: RestauranteEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantesRoutingModule { }
