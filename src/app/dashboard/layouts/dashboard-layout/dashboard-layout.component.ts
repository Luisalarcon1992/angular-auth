import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {


  private userService = inject( AuthService );
  public user = computed( () => this.userService.currentUser());

  onLogout(){
    this.userService.logout();
  }


}
