import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getUserRole } from '@utils/common';
import { ROLES } from '@utils/constants';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = getUserRole();

  if (role === ROLES.SUPER_ADMIN) {
    return true;
  }

  if (route.routeConfig && 'role' in route.routeConfig) {
    const permission = route.routeConfig.role as string[] | null;

    if (permission && permission.includes(role || '')) {
      return true;
    } else {
      if (role == ROLES.MANAGER) {
        return router.navigate(['/account']);
      }
      return router.navigate(['/']);
    }
  } else {
    return router.navigate(['/login']);
  }
};
