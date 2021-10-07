import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public onResetPassword(email: string) {
    if (this.validateEmail(email)) {
      this.authService.forgotPassword(email).then(() => {
        this.router.navigate(['verify-your-email']);
      });
    } else {
      alert('Error, veuillez saisir une adresse email valide');
    }
  }

  private validateEmail(emailAdress: string) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }
}
