import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogService } from '../../core/catalog.service';
import { LocalCurrencyPipe } from '../../core/localize.pipes';
import { CURRENCIES, Transfer } from '../../data/transfers';
import { FieldError } from '../../shared/field-error/field-error';

@Component({
  selector: 'app-transfer-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    LocalCurrencyPipe,
    FieldError,
  ],
  template: `
    <h2 mat-dialog-title>{{ 'form.newTransfer' | translate }}</h2>

    <mat-dialog-content>
      <form [formGroup]="form" class="flex flex-col gap-2 pt-2">
        <mat-form-field appearance="outline">
          <mat-label>{{ 'form.customerName' | translate }}</mat-label>
          <input
            matInput
            formControlName="customer"
            [placeholder]="'form.customerNamePlaceholder' | translate" />
        </mat-form-field>
        <app-field-error [control]="form.controls.customer" />

        <mat-form-field appearance="outline">
          <mat-label>{{ 'form.item' | translate }}</mat-label>
          <mat-select formControlName="itemId" (selectionChange)="onItemChange($event.value)">
            <mat-option [value]="null">{{ 'form.noItem' | translate }}</mat-option>
            @for (item of items(); track item.id) {
              <mat-option [value]="item.id">
                {{ item.name }} — {{ item.price | localCurrency: item.currency }}
              </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ 'form.amount' | translate }}</mat-label>
          <input
            matInput
            type="number"
            formControlName="amount"
            [placeholder]="'form.amountPlaceholder' | translate" />
        </mat-form-field>
        <app-field-error [control]="form.controls.amount" />

        <mat-form-field appearance="outline">
          <mat-label>{{ 'form.currency' | translate }}</mat-label>
          <mat-select formControlName="currency">
            @for (c of currencies; track c) {
              <mat-option [value]="c">{{ c }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ 'form.notes' | translate }}</mat-label>
          <textarea
            matInput
            rows="2"
            formControlName="notes"
            [placeholder]="'form.notesPlaceholder' | translate"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>{{ 'common.cancel' | translate }}</button>
      <button mat-flat-button color="primary" (click)="submit()">
        {{ 'common.save' | translate }}
      </button>
    </mat-dialog-actions>
  `,
})
export class TransferDialog {
  private readonly fb = inject(FormBuilder);
  private readonly ref = inject(MatDialogRef<TransferDialog>);
  private readonly catalog = inject(CatalogService);

  protected readonly currencies = CURRENCIES;
  protected readonly items = computed(() => this.catalog.all().filter((i) => i.active));

  protected readonly form = this.fb.nonNullable.group({
    customer: ['', [Validators.required, Validators.minLength(3)]],
    itemId: [null as string | null],
    amount: [null as number | null, [Validators.required, Validators.min(1)]],
    currency: ['USD', Validators.required],
    notes: [''],
  });

  /** Selecting an item pre-fills the amount/currency from its price — still editable afterwards. */
  protected onItemChange(itemId: string | null): void {
    const item = this.items().find((i) => i.id === itemId);
    if (item) {
      this.form.patchValue({ amount: item.price, currency: item.currency });
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const item = this.items().find((i) => i.id === v.itemId);
    const result: Transfer = {
      id: 'TRX-' + Math.floor(1000 + Math.random() * 9000),
      customer: v.customer,
      amount: Number(v.amount),
      currency: v.currency,
      date: new Date().toISOString(),
      status: 'pending',
      itemName: item?.name,
    };
    this.ref.close(result);
  }
}
