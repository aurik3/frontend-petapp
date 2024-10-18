import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 private authService = inject( AuthService )

 public finishAuthCheking = computed<boolean>( () => {
  if( this.authService.authStatus() === AuthStatus.checking ) {
    return false;
  }
  else if( this.authService.authStatus() === AuthStatus.notAuthenticated ) {
    return false;
  }
  return true;
 });

 public statusChecked = effect( () => {
   console.log('auth status', this.authService.authStatus())
 })

}
