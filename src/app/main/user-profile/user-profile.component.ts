import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceProxy, FileInputDto, UpdateUserInfomationInputDto } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import * as _ from 'lodash';

@Component({
	templateUrl: './user-profile.component.html',
	styleUrls: [
		'./user-profile.component.less'
	],
})
export class UserProfileComponent implements OnInit {

	formUserProfile:FormGroup;
	formChangePassword:FormGroup;
	
	strTypeImg = '.image/jpg.image/jpeg.image/bmp.image/gif.image/png.jpg.jpeg.bmp.gif.png';

	constructor(
		private readonly _authenticationServiceProxy:AuthenticationServiceProxy,
		private readonly _fb: FormBuilder,
		public   readonly _appSessionService:AppSessionService
	) {
	}

	file;

	ngOnInit() {

		this.formUserProfile = this._fb.group({
			'userName': [this._appSessionService.user.userName, [Validators.required, Validators.maxLength(255)]],
			'surname': [this._appSessionService.user.surname, [Validators.required, Validators.maxLength(32)]],
			'name': [this._appSessionService.user.name, [Validators.required, Validators.maxLength(32)]],
		});

		this.formChangePassword = this._fb.group({
			'password': [null, [Validators.required, Validators.maxLength(255)]],
			'confirmPassword': [null, [Validators.required, Validators.maxLength(32)]],
		},
		{
			validator: this.comparePassword.bind(this)
		});
	}

	updateAvatarUser(){

		if(!this.file) return;

		this._authenticationServiceProxy.updateAvatarUser(FileInputDto.fromJS(this.file)).subscribe(res => {
			this._appSessionService.user.avatar = this.file.data;
			this.file = null;
			toastr.success("Update avatar successfully")
		})
	}

	updateUserProle(){

		if(this.formUserProfile.invalid) return;

		this._authenticationServiceProxy.updateInfomationUser(UpdateUserInfomationInputDto.fromJS(this.formUserProfile.value)).subscribe(res => {
			toastr.success("Update user profile successfully")
		})

	}

	changePassword(){

		if(this.formChangePassword.invalid) return;
		
		this._authenticationServiceProxy.updateUserPassword(this.formChangePassword.get('password').value).subscribe(res => {
			toastr.success("Change password successfully")
		})
	}

	async onSelectFile($event:any) {
 
		if ($event.target.files && $event.target.files[0]) {
	
		  var files = $event.target.files;
		  
		  for (let i = 0; i < files.length; i++) {
			var fileDto = files[i];

			if(this.strTypeImg.indexOf(fileDto.type) != -1){
				this.file = await this.fileBase64(fileDto);
			}
			else{
				toastr.error("Uploaded file is not an image format.")
			}
		  }
	
		}
	}

	private comparePassword = (control: AbstractControl): { [key: string]: any } | null => {
		return control.get('password').value == control.get('confirmPassword').value ? null : { 'notSame': true }
	};

	private fileBase64(file) {
		return new Promise((resolve, reject) => {
		  let reader = new FileReader();
		  reader.readAsDataURL(file);
		  reader.onload = function () {
			file.data = reader.result;
			file = _.pick(file, ['type', 'name', 'data', 'id'])
			resolve(file);
		  };
		  reader.onerror = function (error) {
			reject(error);
		  };
		});
	}

}
