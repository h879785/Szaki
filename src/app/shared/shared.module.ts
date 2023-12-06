import { NgModule } from '@angular/core';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { BirthpipePipe } from './pipe/birthpipe.pipe';
import { DatepipePipe } from './pipe/datepipe.pipe';
import { TextPipe } from './pipe/text.pipe';

@NgModule({
  declarations: [
    SearchFilterPipe,
    BirthpipePipe,
    DatepipePipe,
    TextPipe,
  ],
  exports: [
    SearchFilterPipe, 
    BirthpipePipe,
    DatepipePipe,
    TextPipe,
  ]
})
export class SharedModule {}
