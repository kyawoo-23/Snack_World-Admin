import { Variant } from './prisma-types/index';
import { Route } from '@angular/router';
import { privateGuard } from '@guards/private/private.guard';
import { publicGuard } from '@guards/public/public.guard';
import { AccountCreateComponent } from '@pages/account/account-create/account-create.component';
import { AccountDetailsComponent } from '@pages/account/account-details/account-details.component';
import { AccountComponent } from '@pages/account/account.component';
import { CategoryCreateComponent } from '@pages/category/category-create/category-create.component';
import { CategoryDetailsComponent } from '@pages/category/category-details/category-details.component';
import { CategoryComponent } from '@pages/category/category.component';
import { DeliveryComponent } from '@pages/delivery/delivery.component';
import { LoginComponent } from '@pages/login/login.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { ReportComponent } from '@pages/report/report.component';
import { VariantCreateComponent } from '@pages/variant/variant-create/variant-create.component';
import { VariantDetailsComponent } from '@pages/variant/variant-details/variant-details.component';
import { VariantComponent } from '@pages/variant/variant.component';
import { VendorCreateComponent } from '@pages/vendor/vendor-create/vendor-create.component';
import { VendorDetailsComponent } from '@pages/vendor/vendor-details/vendor-details.component';
import { VendorComponent } from '@pages/vendor/vendor.component';
import { MenuLayoutComponent } from '@ui/menu-layout/menu-layout.component';

interface NavRoute extends Route {
  icon: string | null;
  children?: NavRoutes;
}

type NavRoutes = NavRoute[];

export const routes: NavRoutes = [
  {
    path: 'login',
    icon: null,
    component: LoginComponent,
    canActivate: [publicGuard],
  },
  {
    path: '',
    icon: null,
    component: MenuLayoutComponent,
    canActivate: [privateGuard],
    children: [
      {
        path: '',
        title: 'Delivery',
        icon: 'local_shipping',
        component: DeliveryComponent,
      },
      {
        path: 'profile',
        title: 'Profile',
        icon: null,
        component: ProfileComponent,
      },
      {
        path: 'account',
        title: 'Account',
        icon: 'group',
        component: AccountComponent,
      },
      {
        path: 'account/create',
        title: 'Create Account',
        icon: null,
        component: AccountCreateComponent,
      },
      {
        path: 'account/:id',
        title: 'Account Details',
        icon: null,
        component: AccountDetailsComponent,
      },
      {
        path: 'category',
        title: 'Category',
        icon: 'category',
        component: CategoryComponent,
      },
      {
        path: 'category/create',
        title: 'Create Category',
        icon: null,
        component: CategoryCreateComponent,
      },
      {
        path: 'category/:id',
        title: 'Category Details',
        icon: null,
        component: CategoryDetailsComponent,
      },
      {
        path: 'variant',
        title: 'Variant',
        icon: 'palette',
        component: VariantComponent,
      },
      {
        path: 'variant/create',
        title: 'Create Variant',
        icon: null,
        component: VariantCreateComponent,
      },
      {
        path: 'variant/:id',
        title: 'Variant Details',
        icon: null,
        component: VariantDetailsComponent,
      },
      {
        path: 'vendor',
        title: 'Vendor',
        icon: 'storefront',
        component: VendorComponent,
      },
      {
        path: 'vendor/create',
        title: 'Create Vendor',
        icon: null,
        component: VendorCreateComponent,
      },
      {
        path: 'vendor/:id',
        title: 'Vendor Details',
        icon: null,
        component: VendorDetailsComponent,
      },
      {
        path: 'report',
        title: 'Report',
        icon: 'query_stats',
        component: ReportComponent,
      },
      {
        title: 'Page not found',
        path: '**',
        icon: null,
        component: NotFoundComponent,
      },
    ],
  },
];
