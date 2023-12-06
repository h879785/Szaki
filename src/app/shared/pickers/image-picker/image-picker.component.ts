import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit{
  @ViewChild('filePicker', { static: false }) filePickerRef?: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;
  selectedImage?: string;
  usePicker = false;

  constructor() {}

  ngOnInit() {
   
  }

  onPickImage() {
      this.filePickerRef?.nativeElement.click();
  }

  onFileChosen(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const pickedFile = target.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        const dataUrl = fr.result as string;
        this.selectedImage = dataUrl;
        this.imagePick.emit(pickedFile);
      };
      fr.readAsDataURL(pickedFile);
    }
  }
}
