import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogeDevoirsComponent } from './edit-dialoge-devoirs.component';

describe('EditDialogeDevoirsComponent', () => {
  let component: EditDialogeDevoirsComponent;
  let fixture: ComponentFixture<EditDialogeDevoirsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogeDevoirsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogeDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
