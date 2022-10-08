import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CounterActions,
  CounterSelectors,
} from 'src/store/slices/counter.slice';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  constructor(private readonly store: Store) {}
  readonly count$ = this.store.select(CounterSelectors.selectValue);
  readonly incrementCount$ = this.store.select(
    CounterSelectors.selectIncrementCount
  );
  readonly decrementCount$ = this.store.select(
    CounterSelectors.selectDecrementCount
  );

  ngOnInit(): void {}

  onDecrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  onIncrement() {
    this.store.dispatch(CounterActions.increment());
  }
}
