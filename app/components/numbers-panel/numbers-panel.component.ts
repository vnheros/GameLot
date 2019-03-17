import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-numbers-panel',
  templateUrl: './numbers-panel.component.html',
  styleUrls: ['./numbers-panel.component.scss']
})
export class NumbersPanelComponent implements OnInit {
  @Input() numbers: any = [];
  @Input() minval: number;
  @Input() maxval: number;

  constructor() {
  }

  ngOnInit() {
  }
}
