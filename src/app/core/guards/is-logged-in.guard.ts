import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const IsLoggedInGuard: CanMatchFn = () => {
  const router = inject(Router);
  // const userService = inject(UserService);
  const isAuthenticated = true;

  // return userService.tokenValidation().pipe(
  //   tap((isAuthenticated) => {
  //     if (!isAuthenticated) router.navigateByUrl('/login');
  //   })
  // );
  console.log('IsLoggedInGuard !');
  if (!isAuthenticated) router.navigateByUrl('/');
  return true;
};
