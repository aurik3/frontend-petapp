import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { tap } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject( Router );

  return authService.verifyAuthStatus().pipe(
    tap(
      (isAuthenticated) => {
        if(!isAuthenticated){
          router.navigateByUrl('/auth/login');
        }
      }
    )
  )
  // if(authService.authStatus() === AuthStatus.authenticated){
  //   debugger
  //   return true;
  // }else{
  //   router.navigateByUrl('/auth/login');
  //   return false;
  // } 

};
