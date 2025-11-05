import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';
import { adminGuard } from './services/admin-guard';
import { normalGuard } from './services/normal-guard';
import { Profile } from './pages/profile/profile';
import { Welcome } from './pages/admin/welcome/welcome';
import { ViewCategories } from './pages/admin/view-categories/view-categories';
import { AddCategory } from './pages/admin/add-category/add-category';
import { ViewQuizzes } from './pages/admin/view-quizzes/view-quizzes';
import { AddQuiz } from './pages/admin/add-quiz/add-quiz';
import { UpdateQuiz } from './pages/admin/update-quiz/update-quiz';
import { ViewQuizQuestions } from './pages/admin/view-quiz-questions/view-quiz-questions';
import { AddQuestion } from './pages/admin/add-question/add-question';


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
        canActivate:[adminGuard],
        children:[
            {
                path:'',
                component:Welcome
            },
            {
                path:'profile',
                component:Profile
            },
            {
                path:'categories',
                component:ViewCategories
            },
            {
                path:'add-category',
                component:AddCategory
            },
            {
                path:'quizzes',
                component:ViewQuizzes,
            },
            {
                path:'add-quiz',
                component:AddQuiz
            },
            {
                path:'quiz/:qId',
                component:UpdateQuiz
            },
            {
                path:'view-questions/:qId/:title',
                component:ViewQuizQuestions
            },
            {
                path:'add-question/:qId/:title',
                component:AddQuestion
            }
        ],
    },
    {
        path:'user-dashboard',
        component: UserDashboard,
        pathMatch:'full',
        canActivate : [normalGuard],
    },
];
