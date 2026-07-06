import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Bank, BankEntityType, MOCK_BANKS } from '../../data/banks';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { BankDialog } from './bank-dialog';

type TypeFilter = 'all' | BankEntityType;

@Component({
  selector: 'app-banks',
  imports: [FormsModule, TranslateModule],
  templateUrl: './banks.html',
})
export class Banks {
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  protected readonly banks = signal<Bank[]>([...MOCK_BANKS]);
  protected readonly query = signal('');
  protected readonly type = signal<TypeFilter>('all');
  protected readonly types: TypeFilter[] = ['all', 'bank', 'wallet'];

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const t = this.type();
    return this.banks().filter((b) => {
      const okType = t === 'all' || b.type === t;
      const okQuery = !q || [b.name, b.code, b.country, b.swift ?? ''].some((f) => f.toLowerCase().includes(q));
      return okType && okQuery;
    });
  });

  protected setType(t: TypeFilter): void {
    this.type.set(t);
  }

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

  protected typeIcon(type: BankEntityType): string {
    return type === 'bank' ? 'account_balance' : 'account_balance_wallet';
  }

  private notify(key: string): void {
    this.snackbar.open(this.translate.instant(key), this.translate.instant('common.close'), {
      duration: 3000,
    });
  }
}
