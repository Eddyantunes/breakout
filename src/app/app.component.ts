import {Component, Input, OnInit} from '@angular/core';
import {Breakout} from './breakout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  amount: number;
  dificulter = 1;
  blocks: void[];
  isPlaying = false;
  id: number;

  constructor() {

  }

  ngOnInit() {
    console.log(
      'Je suis un test'
    );
  }

  play(id) {
    this.id = id;
    this.isPlaying = true;
    console.log(id);

      if (id === 1) {
        this.amount = 10;
      } else if (id === 2) {
        this.amount = 20;
      } else if (id === 3) {
        this.amount = 30;
      } else if (id === 4) {
        this.amount = 40;
      } else if (id === 5) {
        this.amount = 50;
      } else if (id === 6) {
        this.amount = 60;
      }


      if (this.amount) {
        this.blocks = Array(this.amount);

        setTimeout(() => {
          // sorry, not angular. This was originally an easter egg, so it doesn't use angular itself.
          new Breakout('.block', () => {
            this.isPlaying = false;
          }, this.id);
        }, 0);
      }
  }

}
