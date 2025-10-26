import { inject } from '@angular/core';
import { 
  CanActivateFn, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';

// Assuming your LoginService is in the correct path relative to the guard
import { LoginService } from './login'; 

/**
 * Functional guard to protect URLs for users with the 'NORMAL' role.
 */
export const normalGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  // 1. Use the inject() function to get access to services (LoginService and Router)
  const loginService = inject(LoginService);
  const router = inject(Router);

  // 2. Implement the authorization logic
  // Check the authentication status (isLoggedIn) AND the user role
  if (loginService.isLoggedIn() && loginService.getUserRole() === 'NORMAL') {
    // User is an authenticated normal user, allow access
    return true; 
  } else {
    // User is not authorized, redirect them to the login page.
    // Returning a UrlTree is the standard way to redirect in a functional guard.
    return router.createUrlTree(['/login']);
  }
};