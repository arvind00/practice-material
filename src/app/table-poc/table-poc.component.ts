import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * @title Dynamic Table | Backend controls the columns & data & row style & cell style
 */
@Component({
  selector: 'app-table-poc',
  templateUrl: './table-poc.component.html',
  styleUrls: ['./table-poc.component.scss']
})
export class TablePocComponent implements AfterViewInit {

  tbConfig = {
    cols: [
      { label: 'Fruit', field: 'fruit', width: 150 },
      { label: 'Price', field: 'price', width: 100 },
      { label: 'Last Updated', field: 'lastUpdated', width: 150 }
    ],
    data: [
      { fruit: 'Apple', price: 150, lastUpdated: '2021-09-27', rowStyle: { background: '#f4f4f4' }, cellStyle: { fruit: { fontWeight: 'bolder' }, price: { color: 'red' } } },
      { fruit: 'Banana', price: 50, lastUpdated: '2021-09-26', rowStyle: { color: 'green' }, cellStyle: {lastUpdated: {color: "green", fontWeight: "500"}} },
      { fruit: 'Orange', price: 60, lastUpdated: '2021-09-29', rowStyle: { background: '#f4f4f4' }, cellStyle: null },
      { fruit: 'Grapes', price: 80, lastUpdated: '2021-09-25', rowStyle: { background: "rgb(248, 113, 113)" }, cellStyle: { fruit: { color: 'white' }, price: { color: 'white' }, lastUpdated: { color: 'white' } } }
    ]
  }
  ds = new MatTableDataSource(this.tbConfig.data);
  colHeaders: string[] = this.tbConfig.cols.map(x => x.field);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit(){
    this.ds.paginator = this.paginator;
    this.ds.sort = this.sort;
  }

  applyGlobalFilter(e: Event){
    const searchTerm = (e.target as HTMLInputElement).value;
    this.ds.filter = searchTerm.trim().toLocaleLowerCase();
  }

  searchTriggered(e: Event){
    this.applyGlobalFilter(e);
  }
  
}
