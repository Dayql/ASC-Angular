import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsernameComponent } from './edit-username.component';

describe('EditUsernameComponent', () => {
  let component: EditUsernameComponent;
  let fixture: ComponentFixture<EditUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsernameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
