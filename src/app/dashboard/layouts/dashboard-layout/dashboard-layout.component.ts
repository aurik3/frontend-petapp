import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FooterComponent,RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private AuthService = inject( AuthService )
  public user = computed( () => this.AuthService.currentUser() )

}
