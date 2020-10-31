import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'restaurantes', loadChildren: () => import('./restaurantes/restaurantes.module').then(m => m.RestaurantesModule) },
  { path: 'pratos', loadChildren: () => import('./pratos/pratos.module').then(m => m.PratosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
