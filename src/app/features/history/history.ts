import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HistoryTxn, MOCK_HISTORY, TxnStatus } from '../../data/history';
import { LocalNumberPipe, LocalDatePipe } from '../../core/localize.pipes';

type StatusFilter = 'all' | TxnStatus;

@Component({
  selector: 'app-history',
  imports: [FormsModule, TranslateModule, LocalNumberPipe, LocalDatePipe],
  templateUrl: './history.html',
})
export class History {
  protected readonly all = signal<HistoryTxn[]>([...MOCK_HISTORY]);
  protected readonly query = signal('');
  protected readonly status = signal<StatusFilter>('all');
  protected readonly limit = signal(6);

  protected readonly statuses: StatusFilter[] = ['all', 'completed', 'pending', 'failed'];

  protected readonly totalIn = computed(() =>
    this.all().filter((t) => t.direction === 'in').reduce((s, t) => s + t.amount, 0),
  );
  protected readonly totalOut = computed(() =>
    this.all().filter((t) => t.direction === 'out').reduce((s, t) => s + t.amount, 0),
  );
  protected readonly pendingCount = computed(
    () => this.all().filter((t) => t.status === 'pending').length,
  );

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const s = this.status();
    return this.all().filter((t) => {
      const matchesStatus = s === 'all' || t.status === s;
      const matchesQuery = !q || [t.party, t.ref].some((f) => f.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  });

  protected readonly visible = computed(() => this.filtered().slice(0, this.limit()));
  protected readonly hasMore = computed(() => this.filtered().length > this.limit());

  protected setStatus(s: StatusFilter): void {
    this.status.set(s);
    this.limit.set(6);
  }

  protected loadMore(): void {
    this.limit.update((n) => n + 6);
  }

  protected statusPill(status: TxnStatus): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300';
      case 'pending':
        return 'bg-secondary-container/20 text-secondary';
      default:
        return 'bg-error-container text-on-error-container';
    }
  }

  protected dotColor(status: TxnStatus): string {
    return status === 'completed' ? 'bg-green-500' : status === 'pending' ? 'bg-secondary-container' : 'bg-error';
  }
}
