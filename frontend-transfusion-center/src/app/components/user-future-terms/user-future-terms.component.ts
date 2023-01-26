import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Term } from 'src/app/models/term';
import { AuthService } from 'src/app/services/auth.service';
import { RegisteredUserService } from 'src/app/services/registered-user.service';
import { TermService } from 'src/app/services/term.service';

@Component({
  selector: 'app-user-future-terms',
  templateUrl: './user-future-terms.component.html',
  styleUrls: ['./user-future-terms.component.css'],
})
export class UserFutureTermsComponent {
  terms: Term[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns = ['beginDate', 'durationInMinutes', 'type', 'status'];
  constructor(
    private termService: TermService,
    private registeredUserService: RegisteredUserService
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.registeredUserService.getUserByEmail().subscribe((response) => {
      this.termService
        .getReservationsByUser(response.id)
        .subscribe((response) => {
          this.terms = response;
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
        });
    });
  }
  cancelTerm(id: number) {
    this.termService
      .cancelTerm(id)
      .subscribe((response) =>
        alert('You have successfuly canceled your reservation!')
      );
  }
}
