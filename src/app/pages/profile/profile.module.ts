import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BannerComponent } from './banner/banner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataComponent } from './data/data.component';
import { PostListComponent } from './post-list/post-list.component';
import { UpdateProfileDataComponent } from './update-profile-data/update-profile-data.component';
import { MatMenuModule } from '@angular/material/menu';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';





@NgModule({
  declarations: [
  ProfileComponent,
   BannerComponent,
   DataComponent,
   PostListComponent,
   UpdateProfileDataComponent,
   ViewProfileComponent,
   MyProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MatCardModule,
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
