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
  @Input() textColor: string = 'white';
  types = LoadingSpinnerType;
  classMaps = new Map<LoadingSpinnerType, string>([
    [LoadingSpinnerType.Smooth, 'smooth'],
    [LoadingSpinnerType.Material, 'material'],
    [LoadingSpinnerType.Pulse, 'pulse'],
    [LoadingSpinnerType.GrowPulse, 'grow-pulse'],
  ]);

  constructor() {}

  get textStyles() {
    return { color: this.textColor };
  }

  get classesSpinner() {
    return `${this.classMaps.get(this.type)} spinner`;
  }

  ngOnInit(): void {}
}
