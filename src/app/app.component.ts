import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  sayHi(){
    console.log('Hi from' + this.title);
  }
  constructor(){
    this.sayHi();
  }
  title = 'practice-material';
}
