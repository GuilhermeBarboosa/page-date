import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-primary',
  standalone: true,
  imports: [],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.css',
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() value?: String;

  constructor() {}

  ngOnInit() {}
}
