import { NgModule } from '@angular/core';
import { AphaNumericDirective } from '@core/directives/alpha-numeric.directive';
import { BackButtonDirective } from '@core/directives/back-button.directive';
import { IdentityDocumentDirective } from '@core/directives/identity-document.directive';
import { MaxCharactersDirective } from '@core/directives/max-length.directive';
import { NumberOnlyDirective } from '@core/directives/number-only.directive';
import { StringOnlyDirective } from '@core/directives/string-only.directive';

@NgModule({
  declarations: [
    BackButtonDirective,
    NumberOnlyDirective,
    StringOnlyDirective,
    AphaNumericDirective,
    MaxCharactersDirective,
    IdentityDocumentDirective,
  ],
  exports: [
    BackButtonDirective,
    NumberOnlyDirective,
    StringOnlyDirective,
    AphaNumericDirective,
    MaxCharactersDirective,
    IdentityDocumentDirective,
  ],
})
export class DirectivesModule {}
