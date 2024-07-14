import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaRelogioComponent } from './casa-relogio.component';

describe('CasaRelogioComponent', () => {
  let component: CasaRelogioComponent;
  let fixture: ComponentFixture<CasaRelogioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasaRelogioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasaRelogioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
