import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';


const routes: Routes = [
  {
    path: 'painting/create',
    pathMatch: 'full',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'painting/details/:id',
    pathMatch: 'full',
    component: DetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'painting/edit/:id',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [AuthGuard]
  }
]

export const IdeaRoutingModule = RouterModule.forChild(routes);
