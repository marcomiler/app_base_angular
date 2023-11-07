import { MatDateFormats } from '@angular/material/core';

export const CUSTOM_FORMATS_DATE: MatDateFormats = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const REGEXP_FORMATS = {
  onlyNumbers: /\D/, // <> /[^0-9]*/g
  onlyString: /[^A-Za-zñÑäëïöüÄËÏÖÜÁÉÍÓÚáéíóú ]*/g,
  alphaNumeric: /[^A-Za-z0-9]*/g,
};
