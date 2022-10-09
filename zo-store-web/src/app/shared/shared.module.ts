import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ...componentsDeclarationsAndExports
  ],
  exports: [
    ...componentsDeclarationsAndExports
  ]
})
export class SharedModule { }

var componentsDeclarationsAndExports: any = [
  
]


