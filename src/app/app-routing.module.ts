import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramsComponent } from './programs/programs.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
	{
    path: 'programs',
    component: ProgramsComponent,
	},
	{ path: 'edit/:id', 
    component: FormComponent 
  	},
	{ path: '', 
    component: FormComponent 
  	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
