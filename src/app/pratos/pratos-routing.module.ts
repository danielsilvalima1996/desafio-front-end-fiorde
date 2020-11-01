import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PratoAddComponent } from './prato-add/prato-add.component';
import { PratoEditComponent } from './prato-edit/prato-edit.component';
import { PratosComponent } from './pratos/pratos.component';

const routes: Routes = [
  { path: '', component: PratosComponent },
  { path: 'add', component: PratoAddComponent },
  { path: 'edit/:id', component: PratoEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PratosRoutingModule { }
