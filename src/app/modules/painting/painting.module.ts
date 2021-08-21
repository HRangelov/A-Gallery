import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [CreateComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule
  ]
})
export class PaintingModule { }
