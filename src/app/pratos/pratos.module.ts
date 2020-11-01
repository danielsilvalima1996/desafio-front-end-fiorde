import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PratosRoutingModule } from './pratos-routing.module';
import { PratosComponent } from './pratos/pratos.component';
import { PoButtonModule, PoContainerModule, PoDividerModule, PoFieldModule, PoLoadingModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PratoEditComponent } from './prato-edit/prato-edit.component';
import { PratoAddComponent } from './prato-add/prato-add.component';


@NgModule({
  declarations: [PratosComponent, PratoEditComponent, PratoAddComponent],
  imports: [
    CommonModule,
    PratosRoutingModule,
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
export class PratosModule { }
