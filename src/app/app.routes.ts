import { Route } from '@angular/router';
import { privateGuard } from '@guards/private/private.guard';
import { publicGuard } from '@guards/public/public.guard';
import { AccountCreateComponent } from '@pages/account/account-create/account-create.component';
import { AccountDetailsComponent } from '@pages/account/account-details/account-details.component';
import { AccountComponent } from '@pages/account/account.component';
import { AnnouncementCreateComponent } from '@pages/announcement/announcement-create/announcement-create.component';
import { AnnouncementComponent } from '@pages/announcement/announcement.component';
import { CategoryCreateComponent } from '@pages/category/category-create/category-create.component';
import { CategoryDetailsComponent } from '@pages/category/category-details/category-details.component';
import { CategoryComponent } from '@pages/category/category.component';
import { DeliveryCreateComponent } from '@pages/delivery/delivery-create/delivery-create.component';
import { DeliveryDetailsComponent } from '@pages/delivery/delivery-details/delivery-details.component';
import { DeliveryComponent } from '@pages/delivery/delivery.component';
import { LoginComponent } from '@pages/login/login.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { RemarkReportComponent } from '@pages/remark-report/remark-report.component';
import { DeliveryOrderReportComponent } from './pages/delivery-order-report/delivery-order-report.component';
import { VariantCreateComponent } from '@pages/variant/variant-create/variant-create.component';
import { VariantDetailsComponent } from '@pages/variant/variant-details/variant-details.component';
import { VariantComponent } from '@pages/variant/variant.component';
import { VendorCreateComponent } from '@pages/vendor/vendor-create/vendor-create.component';
import { VendorDetailsComponent } from '@pages/vendor/vendor-details/vendor-details.component';
import { VendorComponent } from '@pages/vendor/vendor.component';
import { MenuLayoutComponent } from '@ui/menu-layout/menu-layout.component';
import { ROLES } from '@utils/constants';
import { roleGuard } from '@guards/role/role.guard';
import { VendorSalesReportComponent } from '@pages/vendor-sales-report/vendor-sales-report.component';

interface NavRoute extends Route {
  icon: string | null;
  children?: NavRoutes;
  role: ROLES[] | null;
}

type NavRoutes = NavRoute[];

export const routes: NavRoutes = [
  {
    path: 'login',
    icon: null,
    component: LoginComponent,
    canActivate: [publicGuard],
    role: null,
  },
  {
    path: '',
    icon: null,
    component: MenuLayoutComponent,
    canActivate: [privateGuard],
    role: null,
    children: [
      {
        path: '',
        icon: null,
        pathMatch: 'full',
        redirectTo: 'delivery',
        role: [ROLES.ADMINSTRATOR, ROLES.STAFF],
      },
      {
        path: 'delivery',
        title: 'Delivery',
        icon: 'local_shipping',
        component: DeliveryComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR, ROLES.STAFF],
      },
      {
        path: 'delivery/create',
        title: 'Create Delivery',
        icon: null,
        component: DeliveryCreateComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR, ROLES.STAFF],
      },
      {
        path: 'delivery/:id',
        title: 'Delivery Details',
        icon: null,
        component: DeliveryDetailsComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR, ROLES.STAFF],
      },
      {
        path: 'profile',
        title: 'Profile',
        icon: null,
        component: ProfileComponent,
        canActivate: [roleGuard],
        role: null,
      },
      {
        path: 'account',
        title: 'Account',
        icon: 'group',
        component: AccountComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'account/create',
        title: 'Create Account',
        icon: null,
        component: AccountCreateComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'account/:id',
        title: 'Account Details',
        icon: null,
        component: AccountDetailsComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'announcement',
        title: 'Announcement',
        icon: 'campaign',
        component: AnnouncementComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'announcement/create',
        title: 'Create Announcement',
        icon: null,
        component: AnnouncementCreateComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'category',
        title: 'Category',
        icon: 'category',
        component: CategoryComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'category/create',
        title: 'Create Category',
        icon: null,
        component: CategoryCreateComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'category/:id',
        title: 'Category Details',
        icon: null,
        component: CategoryDetailsComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'variant',
        title: 'Variant',
        icon: 'palette',
        component: VariantComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'variant/create',
        title: 'Create Variant',
        icon: null,
        component: VariantCreateComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'variant/:id',
        title: 'Variant Details',
        icon: null,
        component: VariantDetailsComponent,
        canActivate: [roleGuard],
        role: [ROLES.ADMINSTRATOR],
      },
      {
        path: 'vendor',
        title: 'Vendor',
        icon: 'storefront',
        component: VendorComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'vendor/create',
        title: 'Create Vendor',
        icon: null,
        component: VendorCreateComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'vendor/:id',
        title: 'Vendor Details',
        icon: null,
        component: VendorDetailsComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'report',
        title: 'Delivery Order Report',
        icon: 'query_stats',
        component: DeliveryOrderReportComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'vendor-sales-report',
        title: 'Vendor Sales Report',
        icon: 'leaderboard',
        component: VendorSalesReportComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        path: 'remark-report',
        title: 'Remark Report',
        icon: 'history_edu',
        component: RemarkReportComponent,
        canActivate: [roleGuard],
        role: [ROLES.MANAGER],
      },
      {
        title: 'Page not found',
        path: '**',
        icon: null,
        component: NotFoundComponent,
        role: null,
      },
    ],
  },
];
