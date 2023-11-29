import { Directive, HostListener, inject } from '@angular/core';
import { NavigationService } from '@core/services/navigation.service';

@Directive({
  selector: '[appBackButton]',
})
export class BackButtonDirective {
  private _navigation = inject(NavigationService);

  @HostListener('click')
  onClick(): void {
    this._navigation.back();
  }
}
