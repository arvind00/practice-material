## Learning Objective
- [x] create a material table with columns generated dynamically 
- [x] control col and row defn from backend
- [x] implement pagination
- [x] implement global filter search
- [x] implement column sorting
- [x] implement download as csv / excel
- [x] control the row and cell styling from backend

### Pre-requisite
- create an angular project
- integrate angular material into your project

### Package Installation
```sh
npm i mat-table-exporter --save
```
- we need the above package for implmenting export feature

### Generate Component
```sh
ng g c table-poc --skip-tests=true --module app
```

### Add The Generated Component To Routing Module
```ts
import { TablePocComponent } from './table-poc/table-poc.component';

const routes: Routes = [
  { path: '', component: TablePocComponent, pathMatch: 'full' }
];
```

### Table Module Import
- create or update the module where you keep material related modules
```ts
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
    exports: [
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatIconModule,
        MatTooltipModule,
        MatTableExporterModule
    ]
})
export class MaterialModule { }
```
- import the above modules as we will need them later

### Define the basic skeleton

```html
<div class="table-container mx-auto mt-3 mat-elevation-z4">
    <table mat-table [dataSource]="ds" matSort class="w-full">
        
    </table>
    <mat-paginator [pageSizeOptions]="[2, 10, 20, 100]"></mat-paginator>
</div>
```

### Update The Style To Give A Fixed Width To Table Container

```scss
.table-container {
    width: 426px;
}
```

### Necessary Imports For Datasource & Pagination & Sorting
- put the below imports in the component as we will need it later
```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
```

### Fetch or Define Table Column And Data Info

```ts
 tbConfig = {
    cols: [
      { label: 'Fruit', field: 'fruit', width: 150 },
      { label: 'Price', field: 'price', width: 100 },
      { label: 'Last Updated', field: 'lastUpdated', width: 150 }
    ],
    data: [
      { fruit: 'Apple', price: 150, lastUpdated: '2021-09-27', rowStyle: { background: '#f4f4f4' }, cellStyle: { fruit: { fontWeight: 'bolder' }, price: { color: 'red' } } },
      { fruit: 'Banana', price: 50, lastUpdated: '2021-09-26', rowStyle: { color: 'green' }, cellStyle: {lastUpdated: {color: "green", fontWeight: "500"}} },
      { fruit: 'Grapes', price: 80, lastUpdated: '2021-09-25', rowStyle: { background: "rgb(248, 113, 113)", color: "white" }, cellStyle: { fruit: { color: 'white' }, price: { color: 'white' }, lastUpdated: { color: 'white' } } }
    ]
  }
```

### Construct Datasource & Table Header
```ts
ds = new MatTableDataSource(this.tbConfig.data);
colHeaders: string[] = this.tbConfig.cols.map(x => x.field); // should match with what is defined in colDef
```

### Update HTML Template To Define The Headers and Rows
- update the html template as below
```html
    <table mat-table [dataSource]="ds" matSort matTableExporter #exporter="matTableExporter" class="w-full">
        <ng-container *ngFor="let col of tbConfig.cols; let colIndex = index" [matColumnDef]="col.field">
            <th mat-header-cell *matHeaderCellDef mat-sort-header [width]="col.width" style="color: white">{{col.label}}
            </th>
            <td mat-cell *matCellDef="let element" [ngStyle]="element.cellStyle && element.cellStyle[col.field]"
                [width]="col.width">{{element[col.field]}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="colHeaders" [ngStyle]="{backgroundColor: 'darkcyan'}"></tr>
        <tr mat-row *matRowDef="let row; columns: colHeaders" [ngStyle]="row.rowStyle"></tr>
    </table>
```

### Update Component Class To Enable Pagination & Sorting
```ts
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    this.ds.paginator = this.paginator;
    this.ds.sort = this.sort;
  }
```

### Template Update To Enable Sorting & Pagination
```html
<div class="table-container mx-auto">
    <table mat-table [dataSource]="ds" class="mat-elevation-z8" matSort>
        <ng-container *ngFor="let col of tbConfig.cols; let colIndex = index" [matColumnDef]="col.field">
            <th mat-header-cell *matHeaderCellDef mat-sort-header [width]="col.width" style="color: white">{{col.label}}</th>
            <td mat-cell *matCellDef="let element" [ngStyle]="element.cellStyle && element.cellStyle[col.field]" [width]="col.width">{{element[col.field]}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="colHeaders" [ngStyle]="{backgroundColor: 'darkcyan'}"></tr>
        <tr mat-row *matRowDef="let row; columns: colHeaders" [ngStyle]="row.rowStyle"></tr>
    </table>
    <mat-paginator [pageSizeOptions]="[2, 10, 20, 100]"></mat-paginator>
</div>
```

### Update style stage 2
```scss
.mat-input-element:focus {
    box-shadow: none;
}
```


### Reference
> listening to clearing search input : https://www.freecodecamp.org/news/targeting-click-of-clear-button-x-on-input-field/

### Quiz

#### Table Export Feature
- Q. What package should be installed?
- A. `mat-table-exporter`

- Q. What module should be imported?
- A. `MatTableExporterModule`

- Q. Anything to import in the componet class?
- A. No, keep all the logics in the template.

- Q. What directive should be applied and where?
- A. Apply the `matTableExporter #exporter="matTableExporter"` to the table element.

- Q. How to export?
- A. Write these instructions to a button click event: `exporter.exportTable('xlsx', {fileName: 'TableData', sheet: 'FRUITS', columnWidths: [15, 8, 15]})`

- Q. What are the export file formats supported?
- A. `xls, xlsx, csv, txt, json, other`