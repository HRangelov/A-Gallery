import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  // loginForm: NgForm;
  loginForm: FormGroup;
  notificationMessage: string;
  loading = false;
  returnUrl: string;
  usernamePattern: string = "[A-Za-z]{6,}"

  constructor(public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // TODO: add redirect guard
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loading = true;

    this.authService
      .SignIn(this.f.email.value,
        this.f.password.value, this.returnUrl);
  }

}
