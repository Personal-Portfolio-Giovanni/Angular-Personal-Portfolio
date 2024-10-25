import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProjectComponent } from './pages/project/project.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'Project',
    component: ProjectComponent,
  },
  {
    path: 'cookie-policy',
    component: CookiePolicyComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
