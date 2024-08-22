import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getLocalStorage } from '@utils/common';
import { LOCAL_STORAGES } from '@utils/constants';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (getLocalStorage(LOCAL_STORAGES.USER_DATA)) {
    return router.navigate(['/']);
  } else {
    return true;
  }
};
