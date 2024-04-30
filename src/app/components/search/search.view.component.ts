import { Component, EventEmitter, Output } from '@angular/core';
import { SEARCH_TEXT, SEARCH_TOOLTIP_TEXT } from '../../shared/constants';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.view.component.html',
  styleUrl: './search.view.component.scss',
})
export class SearchViewComponent {
  @Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();

  readonly searchText: string = SEARCH_TEXT;
  readonly searchTooltipText: string = SEARCH_TOOLTIP_TEXT;

  onInputChanged(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target) {
      return;
    }

    this.inputChanged.emit(target.value);
  }
}
