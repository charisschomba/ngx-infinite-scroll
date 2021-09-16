import { NgModule } from '@angular/core';
import { NgxInfiniteScrollComponent } from './ngx-infinite-scroll.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";



@NgModule({
  declarations: [
    NgxInfiniteScrollComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [
    NgxInfiniteScrollComponent
  ]
})
export class NgxInfiniteScrollModule { }
