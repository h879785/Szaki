import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendprofilesComponent } from './friendprofiles.component';

describe('FriendprofilesComponent', () => {
  let component: FriendprofilesComponent;
  let fixture: ComponentFixture<FriendprofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendprofilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
