import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/auth/auth.guard';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditUsernameComponent } from './components/edit-username/edit-username.component';
import { EditEmailComponent } from './components/edit-email/edit-email.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductNameComponent } from './components/edit-product-name/edit-product-name.component';
import { EditProductReferenceComponent } from './components/edit-product-reference/edit-product-reference.component';
import { EditProductPriceComponent } from './components/edit-product-price/edit-product-price.component';
import { StockManagementComponent } from './components/stock-management/stock-management.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'edit-username', component: EditUsernameComponent, canActivate: [AuthGuard] },
  { path: 'edit-email', component: EditEmailComponent, canActivate: [AuthGuard] },
  { path: 'edit-password', component: EditPasswordComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'edit-product-name/:id', component: EditProductNameComponent, canActivate: [AuthGuard] },
  { path: 'edit-product-reference/:id', component: EditProductReferenceComponent, canActivate: [AuthGuard] },
  { path: 'edit-product-price/:id', component: EditProductPriceComponent, canActivate: [AuthGuard] },
  { path: 'stock-management/:id', component: StockManagementComponent, canActivate: [AuthGuard] }, 
  { path: 'history', component: HistoryComponent },
  { path: '**', component: ErrorComponent }
];
