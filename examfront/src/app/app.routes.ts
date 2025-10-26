import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';
import { adminGuard } from './services/admin-guard';
import { normalGuard } from './services/normal-guard';

export const routes: Routes = [
    {
        path:'',
        component:Home,
        pathMatch:'full'
    },
    {path:'signup',
     component:Signup,
     pathMatch:'full',
    },
    {
        path:'login',
        component:Login,
        pathMatch:'full',
    },
    {
        path:'admin',
        component: Dashboard,
        pathMatch: 'full',
        canActivate:[adminGuard],
    },
    {
        path:'user-dashboard',
        component: UserDashboard,
        pathMatch:'full',
        canActivate : [normalGuard],
    },
];
