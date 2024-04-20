import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

    // Example of how to store the redirect URL in local storage
    const url = state.url;
    localStorage.setItem('redirectUrl', url);

    const authService = inject(AuthService);
    const router = inject( Router );

    if( authService.authStatus() === AuthStatus.authenticated ) {
      router.navigateByUrl('/dashboard');
      return false;
    }


    return true;
};
