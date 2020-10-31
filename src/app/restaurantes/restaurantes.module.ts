import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantesRoutingModule } from './restaurantes-routing.module';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { PoModule, PoPageModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [RestaurantesComponent],
  imports: [
    CommonModule,
    RestaurantesRoutingModule,
    PoPageModule
  ]
})
export class RestaurantesModule { }
