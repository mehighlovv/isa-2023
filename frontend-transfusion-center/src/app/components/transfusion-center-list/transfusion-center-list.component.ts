import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransfusionCenter } from 'src/app/models/transfusion-center';
import { TransfusionCenterService } from 'src/app/services/transfusion-center.service';

@Component({
  selector: 'app-transfusion-center-list',
  templateUrl: './transfusion-center-list.component.html',
  styleUrls: ['./transfusion-center-list.component.css'],
})
export class TransfusionCenterListComponent {
  transfusionCenters: TransfusionCenter[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns = ['name', 'address', 'avgRating'];

  constructor(private transfusionCenterService: TransfusionCenterService) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getAllCenters();
  }

  getAllCenters() {
    this.transfusionCenterService.getAllCenters().subscribe((response) => {
      this.transfusionCenters = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }
}
