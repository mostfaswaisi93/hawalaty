import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService, DEMO_EMAIL, DEMO_PASSWORD } from '../../core/auth.service';
import { LanguageSwitcher } from '../../shared/language-switcher/language-switcher';
import { FieldError } from '../../shared/field-error/field-error';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TranslateModule,
    LanguageSwitcher,
    FieldError,
  ],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackbar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  protected readonly loading = signal(false);
  protected readonly hidePassword = signal(true);

  protected readonly demoEmail = DEMO_EMAIL;
  protected readonly demoPassword = DEMO_PASSWORD;

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    remember: [true],
  });

  protected fillDemo(): void {
    this.form.patchValue({ email: this.demoEmail, password: this.demoPassword });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.loading.set(true);

    this.auth.login(email, password).subscribe({
      next: (user) => {
        this.auth.completeLogin(user);
        this.loading.set(false);
        this.snackbar.open(this.translate.instant('auth.loginSuccess'), '', { duration: 2500 });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading.set(false);
        this.snackbar.open(
          this.translate.instant('auth.invalidCredentials'),
          this.translate.instant('common.close'),
          { duration: 4000 },
        );
      },
    });
  }
}
