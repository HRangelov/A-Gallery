import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';

import { ReactiveFormsModule } from '@angular/forms';

import { EditComponent } from './edit/edit.component';
import { CoreModule } from '../../modules/core/core.module';
import { DetailsComponent } from './details/details.component';
import { PaintingRoutingModule } from './painting-routing.module';



@NgModule({
  declarations: [CreateComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    PaintingRoutingModule
  ]
})
export class PaintingModule { }
