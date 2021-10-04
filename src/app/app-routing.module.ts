import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePocComponent } from './table-poc/table-poc.component';

const routes: Routes = [
  { path: '', component: TablePocComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
