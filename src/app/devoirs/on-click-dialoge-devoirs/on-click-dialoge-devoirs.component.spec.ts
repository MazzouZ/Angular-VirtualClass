import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnClickDialogeDevoirsComponent } from './on-click-dialoge-devoirs.component';

describe('OnClickDialogeDevoirsComponent', () => {
  let component: OnClickDialogeDevoirsComponent;
  let fixture: ComponentFixture<OnClickDialogeDevoirsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnClickDialogeDevoirsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnClickDialogeDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
