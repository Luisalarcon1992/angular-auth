import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject( AuthService );
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>(( ) => {

    if ( this.authService.authStatus() === AuthStatus.cheking ) return false;

    return true;
  })

  public isAuthenticatedEffect = effect( () => {

    switch ( this.authService.authStatus() ) {
      case AuthStatus.cheking:
        return;
      case AuthStatus.authenticated:
        // El guard de la ruta isAuthenticatedGuard guarda la URL de redirección en el localStorage.
        const url = localStorage.getItem('redirectUrl') || '/';
        this.router.navigateByUrl(url);
        return;
      case AuthStatus.unauthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }

  })

}
