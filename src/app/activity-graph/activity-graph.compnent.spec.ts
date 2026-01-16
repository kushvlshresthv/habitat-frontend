import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityGraphCompnent } from './activity-graph.compnent';

describe('ActivityGraphCompnent', () => {
  let component: ActivityGraphCompnent;
  let fixture: ComponentFixture<ActivityGraphCompnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityGraphCompnent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityGraphCompnent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
