import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

const routes: Routes = [
  {
    path: "product-detal/:id",
    component: ProductDetailComponent,
  },
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "login",
    component: UserLoginComponent,
  },
  {
    path: "register",
    component: UserRegisterComponent,
  },
  {
    path: "**",
    redirectTo: "/login",
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
