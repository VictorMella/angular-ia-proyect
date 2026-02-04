import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsConsPage } from './pros-cons-page';

describe('ProsConsPage', () => {
  let component: ProsConsPage;
  let fixture: ComponentFixture<ProsConsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProsConsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsConsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
