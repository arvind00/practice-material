import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  show: boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSpinnerState().subscribe((state)=>{
      setTimeout(()=>this.show = state, 1);
    })
  }

}
