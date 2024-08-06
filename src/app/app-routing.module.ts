import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'story-list',
    loadChildren: () =>
      import(`./story-list/story-list.module`).then((m) => m.StoryListModule),
  },
  { path: '', redirectTo: 'story-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
