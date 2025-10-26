import { inject } from '@angular/core';
import { 
  CanActivateFn, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';

// Assuming your LoginService is in the same directory or accessible via this path
import { LoginService } from './login';

/**
 * Functional guard to protect the Admin URL.
 * Checks if the user is logged in AND has the 'ADMIN' role.
 */
export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  // 1. Use the inject() function to get access to services
  const loginService = inject(LoginService);
  const router = inject(Router);

  // 2. Implement the authorization logic
  // Check the authentication status (isLoggedIn) AND the user role
  if (loginService.isLoggedIn() && loginService.getUserRole() === 'ADMIN') {
    // User is an authenticated admin, allow access
    return true; 
  } else {
    // User is not authorized, redirect them to the login page.
    // Returning a UrlTree is the standard way to redirect in a functional guard.
    return router.createUrlTree(['/login']);
  }
};