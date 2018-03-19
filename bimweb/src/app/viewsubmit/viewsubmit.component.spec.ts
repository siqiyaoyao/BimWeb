import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsubmitComponent } from './viewsubmit.component';

describe('ViewsubmitComponent', () => {
  let component: ViewsubmitComponent;
  let fixture: ComponentFixture<ViewsubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
