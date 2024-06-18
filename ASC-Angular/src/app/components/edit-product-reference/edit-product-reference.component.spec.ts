import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductReferenceComponent } from './edit-product-reference.component';

describe('EditProductReferenceComponent', () => {
  let component: EditProductReferenceComponent;
  let fixture: ComponentFixture<EditProductReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductReferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
