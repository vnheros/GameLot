import { Component, OnInit } from '@angular/core';
import { PasswordValidator } from '../validators/password';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupCreds: FormGroup;
  usernameIsValid: boolean = false;
  loading: any;

  constructor(
    private auth: AuthService, 
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
   this.signupCreds = this.formBuilder.group({
    username: new FormControl('', Validators.compose([Validators.required, 
              Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]*')])),
    password: new FormControl('', Validators.compose([Validators.required, PasswordValidator.checkPassword])),
    email: new FormControl('', Validators.compose([Validators.required, 
              Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]))
   });
  }

  checkUsername(username) {
    console.log("Check user name:" + username);
    if (username.length < 4) {
      this.usernameIsValid = false;
      console.log("NG");
      return;
    }
    this.auth.check(username.toLowerCase()).then(
      (success) => {
        this.usernameIsValid = true;
        console.log("OK");
      },
      (err) => {
        this.usernameIsValid = false;
        console.log("Existed");
      }
    );
  }

  async signup(credentials){
    await this.showLoader();
  	this.auth.signup(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.goRoot('/home');
  	}, (err) => {
  		this.loading.dismiss();
    });
  }

  async showLoader(){
    this.loading = await this.loadingCtrl.create({
      content: 'Creating new account...'
    });
    return await this.loading.present();
  }

}
