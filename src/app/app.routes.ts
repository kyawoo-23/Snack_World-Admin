import { Route, Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { MenuLayoutComponent } from '@ui/menu-layout/menu-layout.component';

interface NavRoute extends Route {
  icon: string | null;
  children?: NavRoutes;
}

type NavRoutes = NavRoute[];

export const routes: NavRoutes = [
  {
    path: '',
    icon: null,
    component: MenuLayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        icon: 'home',
        component: HomeComponent,
      },
    ],
  },
];
