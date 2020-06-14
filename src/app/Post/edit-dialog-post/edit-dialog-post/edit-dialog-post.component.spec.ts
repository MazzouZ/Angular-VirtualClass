import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogPostComponent } from './edit-dialog-post.component';

describe('EditDialogPostComponent', () => {
  let component: EditDialogPostComponent;
  let fixture: ComponentFixture<EditDialogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
