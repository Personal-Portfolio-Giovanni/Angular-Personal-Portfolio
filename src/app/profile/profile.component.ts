import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  environment = environment;
  fullName: string = 'Giovanni Lamarmora';
  email: string = 'giovannilamarmora.working@gmail.com';
}
