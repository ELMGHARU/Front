import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardAdminComponent', () => {
  let component: DashboardAdminComponent;
  let fixture: ComponentFixture<DashboardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardAdminComponent // Comme composant standalone
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
