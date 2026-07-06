import { inject, Injectable } from '@angular/core';
import { LanguageService } from './language.service';

/**
 * Locale-aware formatting via the Intl API so numbers, dates and currency
 * re-format instantly when the language changes — no LOCALE_ID re-provisioning.
 */
@Injectable({ providedIn: 'root' })
export class FormatService {
  private readonly lang = inject(LanguageService);

  private get locale(): string {
    return this.lang.locale();
  }

  number(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, options).format(value);
  }

  currency(value: number, currency = 'USD'): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  }

  date(value: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(
      this.locale,
      options ?? { dateStyle: 'medium' },
    ).format(new Date(value));
  }
}
