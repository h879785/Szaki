import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPostCreatorComponent } from './group-post-creator.component';

describe('GroupPostCreatorComponent', () => {
  let component: GroupPostCreatorComponent;
  let fixture: ComponentFixture<GroupPostCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPostCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupPostCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
