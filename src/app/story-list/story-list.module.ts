import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryListRoutingModule } from './story-list-routing.module';
import { StoryListComponent } from './story-list.component';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    StoryListComponent
  ],
  imports: [
    CommonModule,
    StoryListRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    Ng2SearchPipeModule,
    MatProgressSpinnerModule
  ]
})
export class StoryListModule { }
