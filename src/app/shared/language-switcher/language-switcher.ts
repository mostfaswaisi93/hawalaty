import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AppLanguage, LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TranslateModule],
  template: `
    <button
      mat-button
      [matMenuTriggerFor]="menu"
      [attr.aria-label]="'language.switch' | translate">
      <mat-icon>language</mat-icon>
      <span class="mx-2 align-middle">{{ language.meta().label }}</span>
      <mat-icon>arrow_drop_down</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      @for (lang of languages; track lang.code) {
        <button mat-menu-item (click)="select(lang.code)">
          <mat-icon>{{ language.current() === lang.code ? 'check' : 'translate' }}</mat-icon>
          <span>{{ lang.label }}</span>
        </button>
      }
    </mat-menu>
  `,
})
export class LanguageSwitcher {
  protected readonly language = inject(LanguageService);
  protected readonly languages = Object.values(this.language.languages);

  protected select(code: AppLanguage): void {
    this.language.use(code);
  }
}
