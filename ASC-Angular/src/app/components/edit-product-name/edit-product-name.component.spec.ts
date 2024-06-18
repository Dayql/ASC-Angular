import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductNameComponent } from './edit-product-name.component';

describe('EditProductNameComponent', () => {
  let component: EditProductNameComponent;
  let fixture: ComponentFixture<EditProductNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
