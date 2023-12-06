import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{
  @Input() me?: User;
  @Input() selectedUser?: User;
  @Input() profilePic: any;

  constructor(
    private imageService: ImageService
  ){}

  ngOnInit(): void {
    }

}
