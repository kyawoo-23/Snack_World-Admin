import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { routes } from '@routes';
import { NgOptimizedImage } from '@angular/common';
import {
  getLocalStorage,
  getUserRole,
  removeLocalStorageItem,
  setLocalStorage,
} from '@utils/common';
import { LOCAL_STORAGES, ROLES } from '@utils/constants';

@Component({
  selector: 'app-menu-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
  ],
  templateUrl: './menu-layout.component.html',
  styleUrl: './menu-layout.component.scss',
})
export class MenuLayoutComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);
  private readonly _observer = inject(BreakpointObserver);

  routes = routes;
  role = getUserRole();

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = getLocalStorage(LOCAL_STORAGES.SIDEBAR_COLLAPSED) === 'true';

  onLogout() {
    removeLocalStorageItem(LOCAL_STORAGES.USER_DATA);
    this._router.navigate(['/login']);
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
      setLocalStorage(
        LOCAL_STORAGES.SIDEBAR_COLLAPSED,
        this.isCollapsed.toString(),
      );
    }
  }

  ngOnInit() {
    this._observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  hasPermission(permission: ROLES[] | null) {
    if (this.role === ROLES.SUPER_ADMIN) {
      return true;
    }

    if (!permission) {
      return true;
    }

    return permission.includes(this.role as ROLES);
  }
}
