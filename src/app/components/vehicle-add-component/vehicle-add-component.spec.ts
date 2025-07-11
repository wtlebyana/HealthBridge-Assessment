import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAddComponent } from './vehicle-add-component';

describe('VehicleAddComponent', () => {
  let component: VehicleAddComponent;
  let fixture: ComponentFixture<VehicleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
