import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MOCK_TRANSFERS, Transfer, TransferStatus } from '../../data/transfers';
import { LocalCurrencyPipe, LocalDatePipe, LocalNumberPipe } from '../../core/localize.pipes';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { TransferDialog } from './transfer-dialog';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    TranslateModule,
    LocalNumberPipe,
    LocalCurrencyPipe,
    LocalDatePipe,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  protected readonly transfers = signal<Transfer[]>([...MOCK_TRANSFERS]);
  protected readonly columns = ['id', 'customer', 'amount', 'date', 'status', 'actions'];

  protected readonly totalVolume = computed(() =>
    this.transfers().reduce((sum, t) => sum + t.amount, 0),
  );
  protected readonly pendingCount = computed(
    () => this.transfers().filter((t) => t.status === 'pending').length,
  );
  protected readonly customerCount = computed(
    () => new Set(this.transfers().map((t) => t.customer)).size,
  );

  protected statusColor(status: TransferStatus): 'primary' | 'accent' | 'warn' {
    return status === 'completed' ? 'primary' : status === 'pending' ? 'accent' : 'warn';
  }

  protected addTransfer(): void {
    this.dialog
      .open(TransferDialog, { width: '480px', maxWidth: '95vw' })
      .afterClosed()
      .subscribe((result?: Transfer) => {
        if (!result) return;
        this.transfers.update((list) => [result, ...list]);
        this.notify('messages.saveSuccess');
      });
  }

  protected deleteTransfer(transfer: Transfer): void {
    this.dialog
      .open(ConfirmDialog, {
        width: '400px',
        maxWidth: '95vw',
        data: { titleKey: 'messages.deleteConfirmTitle', messageKey: 'messages.deleteConfirmText' },
      })
      .afterClosed()
      .subscribe((confirmed?: boolean) => {
        if (!confirmed) return;
        this.transfers.update((list) => list.filter((t) => t.id !== transfer.id));
        this.notify('messages.deleteSuccess');
      });
  }

  private notify(key: string): void {
    this.snackbar.open(this.translate.instant(key), this.translate.instant('common.close'), {
      duration: 3000,
    });
  }
}
