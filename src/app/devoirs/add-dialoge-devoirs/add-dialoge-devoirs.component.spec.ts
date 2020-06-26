import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogeDevoirsComponent } from './add-dialoge-devoirs.component';

describe('AddDialogeDevoirsComponent', () => {
  let component: AddDialogeDevoirsComponent;
  let fixture: ComponentFixture<AddDialogeDevoirsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDialogeDevoirsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogeDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
