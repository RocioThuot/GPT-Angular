import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxSelectedComponent } from './text-box-selected.component';

describe('TextBoxSelectedComponent', () => {
  let component: TextBoxSelectedComponent;
  let fixture: ComponentFixture<TextBoxSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextBoxSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextBoxSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
