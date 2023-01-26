import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegisteredUser } from 'src/app/models/registered-user';
import { Term } from 'src/app/models/term';
import { AuthService } from 'src/app/services/auth.service';
import { RegisteredUserService } from 'src/app/services/registered-user.service';
import { TermService } from 'src/app/services/term.service';

@Component({
  selector: 'app-user-term-history',
  templateUrl: './user-term-history.component.html',
  styleUrls: ['./user-term-history.component.css'],
})
export class UserTermHistoryComponent {
  terms: Term[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns = ['beginDate', 'durationInMinutes', 'type', 'status'];

  constructor(
    private termService: TermService,
    private registeredUserService: RegisteredUserService
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getTermHistory();
  }

  getTermHistory() {
    this.registeredUserService.getUserByEmail().subscribe((response) => {
      this.termService
        .getTermHistoryByUser(response.id)
        .subscribe((response) => {
          this.terms = response;
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
        });
    });
  }
}
