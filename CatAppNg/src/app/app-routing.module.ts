import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatSettingsComponent } from './cat-settings/cat-settings.component';
import { CatEditComponent } from './cat-settings/cat-edit.component';

const routes: Routes = [
  { path: '', component: CatSettingsComponent, pathMatch: 'full' },
  { path: 'edit', component: CatEditComponent },
  { path: 'edit/:id', component: CatEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
