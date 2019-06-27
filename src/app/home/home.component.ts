import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() Show = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  show() {
    this.Show.emit();
  }
}
