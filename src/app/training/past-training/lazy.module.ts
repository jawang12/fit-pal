import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PastTrainingComponent } from './past-training.component';

const pastTrainingRoutes: Routes = [
  {
    path: '',
    component: PastTrainingComponent
  }
];

@NgModule({
  declarations: [ PastTrainingComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(pastTrainingRoutes)
  ]
})

export class PastTrainingLazyModule { }
