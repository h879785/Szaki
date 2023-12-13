import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingMembersComponent } from './managing-members.component';

describe('ManagingMembersComponent', () => {
  let component: ManagingMembersComponent;
  let fixture: ComponentFixture<ManagingMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagingMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
