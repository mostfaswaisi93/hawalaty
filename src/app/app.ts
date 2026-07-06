import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BidiModule } from '@angular/cdk/bidi';
import { LanguageService } from './core/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BidiModule],
  template: `
    <div [dir]="dir()" class="h-full">
      <router-outlet />
    </div>
  `,
})
export class App {
  private readonly language = inject(LanguageService);

  /** Drives the CDK [dir] binding so Material flips RTL/LTR app-wide at runtime. */
  protected readonly dir = this.language.dir;

  constructor() {
    // Restore saved language (or default to Arabic) before the view renders.
    this.language.init();
  }
}
