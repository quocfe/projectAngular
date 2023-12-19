import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { StarComponent } from './components/star/star.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutes } from './routes/admin.routing';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

const routers: Routes = [
  { path: 'productlist', component: ProductListComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'productadd', component: ProductAddComponent },
  { path: '', pathMatch: 'full', redirectTo: 'productlist' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    ProductDetailComponent,
    StarComponent,
    ProductAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutes,
    RouterModule.forRoot(routers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
