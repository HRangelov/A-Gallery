import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FooterComponent, LoaderComponent, NavigationComponent, NotfoundpageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    NotfoundpageComponent,
    LoaderComponent]
})
export class CoreModule { }
