import { UsersService } from '../../../services/users.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  modalRef: BsModalRef;

  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  async onSubmit() {
    try{
      await this.usersService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
      this.modalRef.hide();
      this.router.navigate(['']);
    } catch(e) {
      alert(e);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg, supermodal'
    });
    this.modalRef.setClass
  }

}
