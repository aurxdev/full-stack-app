import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTicketComponent } from './liste-ticket.component';

describe('ListeTicketComponent', () => {
  let component: ListeTicketComponent;
  let fixture: ComponentFixture<ListeTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
