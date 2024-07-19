import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AirPollutionService } from '../air-pollution.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us-modal',
  templateUrl: './contact-us-modal.component.html',
  styleUrls: ['./contact-us-modal.component.scss']
})
export class ContactUsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactUsModalComponent>,
    private contactService: AirPollutionService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(contactForm: NgForm): void {
    if (contactForm.valid) {
      const formData = {
        name: contactForm.value.name,
        email: contactForm.value.email,
        message: contactForm.value.message
      };

      this.contactService.submitContactForm(formData)
        .subscribe(
          (response: string) => { // Handle response as string
            console.log('Contact form submitted successfully', response);
            this.snackBar.open('Thank you for contacting us!', 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.dialogRef.close();
          },
          (error: any) => {
            console.error('Error submitting contact form', error);
            this.snackBar.open('Failed to submit contact form. Please try again.', 'Close', {
              duration: 3000,
            });
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
