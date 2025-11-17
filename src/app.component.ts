
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  step = signal<'entry' | 'payment' | 'receipt'>('entry');
  vehicleNumber = signal('');
  tollAmount = signal(0);
  selectedPaymentMethod = signal<string | null>(null);
  isProcessing = signal(false);
  transactionId = signal('');
  
  paymentMethods = [
    { name: 'Credit Card', icon: 'credit-card' },
    { name: 'UPI', icon: 'upi' },
    { name: 'Net Banking', icon: 'net-banking' },
  ];

  isVehicleNumberValid = computed(() => {
    const vn = this.vehicleNumber().trim().toUpperCase();
    // A common regex for Indian vehicle number plates
    const regex = /^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z]){1,2}[ -]?[0-9]{1,4}$/;
    return regex.test(vn);
  });

  submitVehicleNumber(): void {
    if (!this.isVehicleNumberValid()) return;
    // Format the vehicle number to a standard format
    this.vehicleNumber.update(v => v.trim().toUpperCase().replace(/\s/g, ''));
    // Generate a random toll amount
    this.tollAmount.set(Math.floor(Math.random() * (250 - 60 + 1)) + 60);
    this.step.set('payment');
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod.set(method);
  }

  processPayment(): void {
    if (!this.selectedPaymentMethod() || this.isProcessing()) return;

    this.isProcessing.set(true);
    setTimeout(() => {
      this.transactionId.set(`TXN${Date.now()}${Math.floor(Math.random() * 1000)}`);
      this.step.set('receipt');
      this.isProcessing.set(false);
    }, 2500);
  }

  startOver(): void {
    this.step.set('entry');
    this.vehicleNumber.set('');
    this.tollAmount.set(0);
    this.selectedPaymentMethod.set(null);
    this.transactionId.set('');
  }
}
