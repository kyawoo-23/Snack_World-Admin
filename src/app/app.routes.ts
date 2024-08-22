import { Route } from '@angular/router';
import { privateGuard } from '@guards/private/private.guard';
import { publicGuard } from '@guards/public/public.guard';
import { AccountDetailsComponent } from '@pages/account/account-details/account-details.component';
import { AccountComponent } from '@pages/account/account.component';
import { CategoryComponent } from '@pages/category/category.component';
import { DeliveryComponent } from '@pages/delivery/delivery.component';
import { LoginComponent } from '@pages/login/login.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ReportComponent } from '@pages/report/report.component';
import { VariantComponent } from '@pages/variant/variant.component';
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
        path: 'account',
        title: 'Account',
        icon: 'group',
        component: AccountComponent,
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
        path: 'variant',
        title: 'Variant',
        icon: 'palette',
        component: VariantComponent,
      },
      {
        path: 'vendor',
        title: 'Vendor',
        icon: 'storefront',
        component: VendorComponent,
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
