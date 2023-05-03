import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { PostlistComponent } from './postlist/postlist.component';
import { MatIconModule } from '@angular/material/icon';
import { DatepipePipe } from '../../shared/pipe/datepipe.pipe';
import { FriendlistComponent } from './friendlist/friendlist.component';


@NgModule({
  declarations: [
    MainComponent,
    PostComponent,
   // DatepipePipe,
    PostlistComponent,
   FriendlistComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
  ]
})
export class MainModule { }
