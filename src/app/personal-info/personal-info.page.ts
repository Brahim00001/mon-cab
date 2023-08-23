import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonDatetime, ToastController, IonMenu } from '@ionic/angular';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  @ViewChild('dateTimeComponent', { static: false }) dateTimeComponent!: IonDatetime;
  @ViewChild('menu', { static: false }) menu!: IonMenu;
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      hasCnamId: ['no'],
      cnamId: [''],
      stuffCount: ['0', Validators.required],
      chamberCount: ['1', Validators.required],
      workDays: new FormControl([], Validators.required),
      Monday_start: new FormControl('09:00', Validators.required),
      Monday_end: new FormControl('16:00', Validators.required),
      Monday_break: new FormControl('no'),
      Monday_break_start: new FormControl('12:00'),
      Monday_break_end: new FormControl('13:30'),
      Tuesday_start: new FormControl('09:00', Validators.required),
      Tuesday_end: new FormControl('16:00', Validators.required),
      Tuesday_break: new FormControl('no'),
      Tuesday_break_start: new FormControl('12:00'),
      Tuesday_break_end: new FormControl('13:30'),
      Wednesday_start: new FormControl('09:00', Validators.required),
      Wednesday_end: new FormControl('16:00', Validators.required),
      Wednesday_break: new FormControl('no'),
      Wednesday_break_start: new FormControl('12:00'),
      Wednesday_break_end: new FormControl('13:30'),
      Thursday_start: new FormControl('09:00', Validators.required),
      Thursday_end: new FormControl('16:00', Validators.required),
      Thursday_break: new FormControl('no'),
      Thursday_break_start: new FormControl('12:00'),
      Thursday_break_end: new FormControl('13:30'),
      Friday_start: new FormControl('09:00', Validators.required),
      Friday_end: new FormControl('16:00', Validators.required),
      Friday_break: new FormControl('no'),
      Friday_break_start: new FormControl('12:00'),
      Friday_break_end: new FormControl('13:30'),
      Saturday_start: new FormControl('09:00', Validators.required),
      Saturday_end: new FormControl('16:00', Validators.required),
      Saturday_break: new FormControl('no'),
      Saturday_break_start: new FormControl('12:00'),
      Saturday_break_end: new FormControl('13:30'),
      Sunday_start: new FormControl('09:00', Validators.required),
      Sunday_end: new FormControl('16:00', Validators.required),
      Sunday_break: new FormControl('no'),
      Sunday_break_start: new FormControl('12:00'),
      Sunday_break_end: new FormControl('13:30'),
      workOnHolidays: [false],
      pauseDuration: [''],
    });
  }

  ngAfterViewInit() {
    this.dateTimeComponent.value = new Date().toISOString();
  }

  async saveForm() {
    if (this.myForm.valid) {
      const selectedDays = this.myForm.value.workDays;
      const sessions: { [key: string]: { start: string; end: string } } = {};
      
      for (const day of selectedDays) {
        const startTime = this.myForm.get(`${day}_start`)?.value;
        const endTime = this.myForm.get(`${day}_end`)?.value;
        sessions[day] = { start: startTime, end: endTime };
      }
      const formattedSessions = this.getFormattedSessions(sessions);

      // Perform necessary processing with the submitted data
      console.log('Form data:', this.myForm.value);
      console.log('Formatted sessions:', formattedSessions);

      // Display a success message
      const toast = await this.toastController.create({
        message: 'Saved successfully',
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      toast.present();
    }
  }

  getFormattedSessions(sessions: { [key: string]: { start: string; end: string } }): { [key: string]: string } {
    const formattedSessions: { [key: string]: string } = {};
    for (const key in sessions) {
      if (sessions.hasOwnProperty(key)) {
        formattedSessions[key] = `${sessions[key].start} - ${sessions[key].end}`;
      }
    }
    return formattedSessions;
  }
}

