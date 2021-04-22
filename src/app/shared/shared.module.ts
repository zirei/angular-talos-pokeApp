import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TransformDescriptionPipe } from './pipes/transform-description/transform-description.pipe';
import { ConvertGenderPipe } from './pipes/convert-gender/convert-gender.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    TransformDescriptionPipe,
    ConvertGenderPipe,
  ],
  exports: [
    NavbarComponent,
    InfiniteScrollModule,
    TransformDescriptionPipe,
    ConvertGenderPipe,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule, 
    FormsModule,
    InfiniteScrollModule,
    
  ]
})
export class SharedModule { }
