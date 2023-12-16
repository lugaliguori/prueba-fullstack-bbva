import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FligthTableComponent } from './fligth-table.component';

describe('FligthTableComponent', () => {
  let component: FligthTableComponent;
  let fixture: ComponentFixture<FligthTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FligthTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FligthTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
