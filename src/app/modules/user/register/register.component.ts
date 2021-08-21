import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  loading = false;
  returnUrl: string;

  constructor(public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.registerForm = this.fb.group({
        email:['',[Validators.email]],
        password:['',[Validators.minLength(6),Validators.required]],
        repassword:['',[Validators.minLength(6),Validators.required]],
      });

    // TODO: redirect guard
    if (this.authService.isLoggedIn) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.loading = true;
    this.authService
      .SignUp(this.f.email.value, this.f.password.value)
      .finally(()=>{
        this.f.password.reset();
        this.f.repassword.reset();
        this.loading = false;
      })
  }
}
