import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  // Example of how to store the redirect URL in local storage
  // const url = state.url;
  // localStorage.setItem('redirectUrl', url);

  const authService = inject(AuthService);
  const router = inject( Router );

  if( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }



  router.navigateByUrl('/auth/login')

  return false;
};
