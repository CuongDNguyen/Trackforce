/**
 * @author Antony Lulciuc
 * @description Defines all possible navigatable routes for TrackForce application
 */

import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from '../components/form-component/form.component';
import { HomeComponent } from '../components/home/home.component';
import { ClientListComponent } from '../components/client-list/client-list.component';
import { LoginComponent } from '../components/login/login.component';
import { ClientMappedComponent } from '../components/client-mapped/client-mapped.component';
import { AssociateListComponent } from '../components/associate-list/associate-list.component';
import { BatchListComponent } from '../components/batch-list/batch-list.component';
import { CreateUserComponent } from '../components/create-user/create-user.component';
import { SkillsetComponent } from '../components/skillset/skillset.component';
import { BatchDetailsComponent } from '../components/batch-details/batch-details.component';
import { AssociateViewComponent } from '../components/associate-view/associate-view.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { PredictionsComponent } from '../components/predictions/predictions.component';
import { MyInterviewComponent } from '../components/myinterview-view/myinterview-view.component';
import { AuthGuard } from '../guards/auth.guard';
import { InterviewDetailsComponent } from '../components/interview-details/interview-details.component';
import { InterviewsComponent } from '../components/interviews-view/interviews-view.component';
import { TrainerViewComponent } from '../components/trainer-view/trainer-view.component';
import { DeployedComponent } from '../components/deployed/deployed.component';
import { UndeployedComponent } from '../components/undeployed/undeployed.component';

/**
 * Place paths here
 */

export const appRoutes: Routes = [
  // {
  //   path: 'home',
  //   canActivate: [AuthGuard],
  //   component: HomeComponent
  // },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'client-listing',
    canActivate: [AuthGuard],
    component: ClientListComponent
  },
  {
    path: 'client-mapped/:id',
    canActivate: [AuthGuard],
    component: ClientMappedComponent
  },
  {
    path: 'associate-listing',
    canActivate: [AuthGuard],
    component: AssociateListComponent
  },
  {
    path: 'associate-listing/:CliOrCur/:name/:mapping/:status',
    canActivate: [AuthGuard],
    component: AssociateListComponent
  },
  {
    path: 'batch-listing',
    canActivate: [AuthGuard],
    component: BatchListComponent
  },
  {
    path: 'batch-details/:id',
    canActivate: [AuthGuard],
    component: BatchDetailsComponent
  },
  {
    path: 'form-comp/:id',
    canActivate: [AuthGuard],
    component: FormComponent
  },
  {
    path: 'create-user',
    canActivate: [AuthGuard],
    component: CreateUserComponent
  },
  {
    path: 'app-home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'predictions',
    canActivate: [AuthGuard],
    component: PredictionsComponent
  },
  {
    path: 'skillset/:id',
    canActivate: [AuthGuard],
    component: SkillsetComponent
  },
  {
    path: 'associate-view',
    canActivate: [AuthGuard],
    component: AssociateViewComponent
  },
  {
    path: 'myinterview-view',
    canActivate: [AuthGuard],
    component: MyInterviewComponent
  },
  {
    path: 'interview-details',
    canActivate: [AuthGuard],
    component: InterviewDetailsComponent
  },
  {
    path: 'interviews',
    canActivate: [AuthGuard],
    component: InterviewsComponent
  },
  {
    path: 'trainer-view',
    canActivate: [AuthGuard],
    component: TrainerViewComponent
  },
  {
    path: 'deployed/:id',
    canActivate: [AuthGuard],
    component: DeployedComponent
  },
  {
    path: 'undeployed/:id',
    canActivate: [AuthGuard],
    component: UndeployedComponent
  },
  {
    // must be LAST in this array because this matches all other paths (fallback)
    path: '**',
    component: NotFoundComponent
  }
];
