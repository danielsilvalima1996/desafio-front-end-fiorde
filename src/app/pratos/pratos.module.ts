import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PratosRoutingModule } from './pratos-routing.module';
import { PratosComponent } from './pratos/pratos.component';
import { PoPageModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [PratosComponent],
  imports: [
    CommonModule,
    PratosRoutingModule,
    PoPageModule
  ]
})
export class PratosModule { }
