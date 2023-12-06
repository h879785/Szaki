import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatepipePipe } from '../../shared/pipe/datepipe.pipe';
import { BirthpipePipe } from '../../shared/pipe/birthpipe.pipe';
import { ImagePickerComponent } from 'src/app/shared/pickers/image-picker/image-picker.component';
import { BannerComponent } from './banner/banner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataComponent } from './data/data.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommentComponent } from './comment/comment.component';
import { UpdateProfileDataComponent } from './update-profile-data/update-profile-data.component';
import { UpdateProfilePictureComponent } from './update-profile-picture/update-profile-picture.component';
import { MatMenuModule } from '@angular/material/menu';





@NgModule({
  declarations: [
    ProfileComponent,
   BannerComponent,
   DataComponent,
   PostListComponent,
   CommentComponent,
   UpdateProfileDataComponent,
   UpdateProfilePictureComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    SharedModule,
  ]
})
export class ProfileModule { }
