import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantesRoutingModule } from './restaurantes-routing.module';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PoButtonModule, PoContainerModule, PoDividerModule, PoFieldModule, PoLoadingModule, PoModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestauranteEditComponent } from './restaurante-edit/restaurante-edit.component';
import { RestauranteAddComponent } from './restaurante-add/restaurante-add.component';


@NgModule({
  declarations: [RestaurantesComponent, RestauranteEditComponent, RestauranteAddComponent],
  imports: [
    CommonModule,
    RestaurantesRoutingModule,
    PoPageModule,
    PoDividerModule,
    PoTableModule,
    ReactiveFormsModule,
    FormsModule,
    PoFieldModule,
    PoContainerModule,
    PoButtonModule,
    PoLoadingModule
  ]
})
export class RestaurantesModule { }
