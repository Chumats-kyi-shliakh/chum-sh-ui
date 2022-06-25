import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveOrderComponent } from './components/active-order/active-order.component';
import { CardComponent } from './components/card/card.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { NumberControlComponent } from './components/number-control/number-control.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ApiService } from './services/api.service';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
  declarations: [
    AppComponent,

    MainPageComponent,
    OrderPageComponent,
    ConfirmationPageComponent,
    MapPageComponent,

    HeaderComponent,
    CardComponent,
    CustomButtonComponent,
    ActiveOrderComponent,
    ProductCardComponent,
    NumberControlComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
