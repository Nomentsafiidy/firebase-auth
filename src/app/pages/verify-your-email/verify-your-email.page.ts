import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verify-your-email',
    templateUrl: './verify-your-email.page.html',
    styleUrls: ['./verify-your-email.page.scss'],
})
export class VerifyYourEmailPage implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}
}
