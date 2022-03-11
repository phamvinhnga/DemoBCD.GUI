import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticateDto, AuthenticationServiceProxy } from '@shared/service-proxies/service-proxies';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';

@Component({
	templateUrl: './login.component.html',
	styleUrls: [
		'./login.component.less'
	],
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(
		private _tokenService:TokenService,
		private _authenticationServiceProxy:AuthenticationServiceProxy,
		private _fb: FormBuilder,
	) {
	}

	ngOnInit() {
		this.loginForm = this._fb.group({
			'userName': ['', [Validators.required, Validators.maxLength(255)]],
			'password': ['', [Validators.required, Validators.maxLength(32)]],
		});
	}


	login(): void {
		if (this.loginForm.invalid) return;

		let input = AuthenticateDto.fromJS(this.loginForm.value);

		this._authenticationServiceProxy.login(input).subscribe(res => {
			var tokenExpireDate =  (new Date(new Date().getTime() + 1000 * 50000000)) ;
			this._tokenService.setToken(
				res.accessToken,
				tokenExpireDate
			);      
			window.location.href = 'app/organization';
		})
	}
}
