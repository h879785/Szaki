import { NgModule } from '@angular/core';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { BirthpipePipe } from './pipe/birthpipe.pipe';
import { DatepipePipe } from './pipe/datepipe.pipe';
import { TextPipe } from './pipe/text.pipe';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchFilterPipe,
    BirthpipePipe,
    DatepipePipe,
    TextPipe,
    ImagePickerComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    SearchFilterPipe, 
    BirthpipePipe,
    DatepipePipe,
    MatIconModule,
    TextPipe,
    ImagePickerComponent,
  ]
})
export class SharedModule {}
