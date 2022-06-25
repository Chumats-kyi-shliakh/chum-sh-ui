import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

import { ROUTES } from './constants/routes';
import { MainPageComponent } from './main-page/main-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { OrderPageComponent } from './order-page/order-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: ROUTES.ORDER,
    component: OrderPageComponent
  },
  {
    path: ROUTES.CONFIRMATION,
    component: ConfirmationPageComponent
  },
  {
    path: ROUTES.MAP,
    component: MapPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
