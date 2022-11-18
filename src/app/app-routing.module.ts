import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './interceptors/loading/loading.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'Project',
    component: ProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
