import { Component, Input, OnInit } from '@angular/core';
import { LoadingSpinnerType } from 'src/shared/enums/loading.types.enum';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() type: LoadingSpinnerType = LoadingSpinnerType.Smooth;
  @Input() text: string = '';
  @Input() textColor: string = 'rgba(255, 255, 255, 0.8)';
  types = LoadingSpinnerType;

  constructor() {}

  ngOnInit(): void {}
}
