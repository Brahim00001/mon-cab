import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonDatetime, ToastController, IonMenu } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('dateTimeComponent', { static: false }) dateTimeComponent!: IonDatetime;
  @ViewChild('menu', { static: false }) menu!: IonMenu;
  myForm!: FormGroup;
  showPriseEnChargeDetails: boolean = false;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      age: ['', Validators.required],
      sessionDuration: [30, Validators.required], // default value 30
      preferences: [[]], // Default value as an empty array
      avisMedecin: this.formBuilder.group({
        nombreSeance: ['', Validators.required],
        frequence: ['', Validators.required],
        tarifSeance: ['', Validators.required],
        dateDebut: new FormControl('2023-1-15', Validators.required),
        medecinTraitant: ['', Validators.required],
      }),
      priseEnCharge: ['NONE', Validators.required],
      priseEnChargeDetails: this.formBuilder.group({
        cnrpsId: [''],
        cnssId: [''],
        nombreSeance: [''],
        frequence: [''],
        dateDebut1: new FormControl('2023-1-15', Validators.required),
        statue: [''],
        nomAssure: [''],
      }),
      attachment: [''], // Initialize as an empty string
    });

    

    // Watch the "Prise en charge" value changes
    this.myForm.get('priseEnCharge')?.valueChanges.subscribe((value) => {
      if (value === 'NONE') {
        this.showPriseEnChargeDetails = false;
        this.myForm.get('priseEnChargeDetails')?.reset();
      } else {
        this.showPriseEnChargeDetails = true;
      }
    });
  }
  ngAfterViewInit() {
    this.dateTimeComponent.value = new Date().toISOString();
  }
  async saveForm() {
    if (this.myForm.valid) {

      // Format the date before saving it
      const dateDebut = format(new Date(this.myForm.get('avisMedecin.dateDebut')?.value), 'yyyy-MM-dd');
      this.myForm.get('avisMedecin.dateDebut')?.setValue(dateDebut);
      const dateDebut1 = format(new Date(this.myForm.get('priseEnChargeDetails.dateDebut1')?.value), 'yyyy-MM-dd');
      this.myForm.get('priseEnChargeDetails.dateDebut1')?.setValue(dateDebut1);
      const attachmentData = this.myForm.value.attachment;

     
      // Perform necessary processing with the submitted data
      console.log('Selected attachment:', attachmentData);
      console.log('Form data:', this.myForm.value);

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
  }
