import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Term } from 'src/app/models/term';
import { AuthService } from 'src/app/services/auth.service';
import { TermService } from 'src/app/services/term.service';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.css'],
})
export class TermListComponent {
  terms: Term[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns = ['beginDate', 'durationInMinutes', 'type', 'status'];

  constructor(
    private route: ActivatedRoute,
    private termService: TermService,
    private authService: AuthService
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getAllTermsByCenter();
  }

  getAllTermsByCenter() {
    this.termService
      .getTermsByTransfusionCenter(
        Number(this.route.snapshot.paramMap.get('id'))
      )
      .subscribe((response) => {
        this.terms = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
      });
  }

  reserveTerm(id: number) {
    this.termService
      .reserveTerm({
        termId: id,
        reserverEmail: this.authService.getEmail(),
      })
      .subscribe((response) => alert('You have succesfully reserved a term'));
  }
}
