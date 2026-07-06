import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Bank, MOCK_BANKS } from '../../data/banks';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { BankDialog } from './bank-dialog';

@Component({
  selector: 'app-banks',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    TranslateModule,
  ],
  templateUrl: './banks.html',
})
export class Banks {
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  protected readonly banks = signal<Bank[]>([...MOCK_BANKS]);
  protected readonly query = signal('');
  protected readonly columns = ['name', 'code', 'country', 'swift', 'status', 'actions'];

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.banks();
    return this.banks().filter((b) =>
      [b.name, b.code, b.country, b.swift].some((f) => f.toLowerCase().includes(q)),
    );
  });

  protected openDialog(bank?: Bank): void {
    this.dialog
      .open(BankDialog, { width: '520px', maxWidth: '95vw', data: bank ?? null })
      .afterClosed()
      .subscribe((result?: Bank) => {
        if (!result) return;
        this.banks.update((list) => {
          const idx = list.findIndex((b) => b.id === result.id);
          if (idx >= 0) {
            const next = [...list];
            next[idx] = result;
            return next;
          }
          return [result, ...list];
        });
        this.notify('banks.saveSuccess');
      });
  }

  protected remove(bank: Bank): void {
    this.dialog
      .open(ConfirmDialog, {
        width: '400px',
        maxWidth: '95vw',
        data: { titleKey: 'banks.deleteConfirmTitle', messageKey: 'banks.deleteConfirmText' },
      })
      .afterClosed()
      .subscribe((confirmed?: boolean) => {
        if (!confirmed) return;
        this.banks.update((list) => list.filter((b) => b.id !== bank.id));
        this.notify('banks.deleteSuccess');
      });
  }

  private notify(key: string): void {
    this.snackbar.open(this.translate.instant(key), this.translate.instant('common.close'), {
      duration: 3000,
    });
  }
}
