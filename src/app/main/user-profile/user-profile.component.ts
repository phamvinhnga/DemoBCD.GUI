import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceProxy, FileInputDto } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';

@Component({
	templateUrl: './user-profile.component.html',
	styleUrls: [
		'./user-profile.component.less'
	],
})
export class UserProfileComponent implements OnInit {

	constructor(
		private readonly _authenticationServiceProxy:AuthenticationServiceProxy
	) {
	}

	file;
	
	ngOnInit() {
	}

	updateAvatarUser(){
		this._authenticationServiceProxy.updateAvatarUser(FileInputDto.fromJS(this.file)).subscribe(res => {

		})
	}

	async onSelectFile($event:any) {
 
		if ($event.target.files && $event.target.files[0]) {
	
		  var files = $event.target.files;
		  
		  for (let i = 0; i < files.length; i++) {
			var fileDto = files[i];
			this.file = await this.fileBase64(fileDto);
			this.updateAvatarUser();
		  }
	
		}
	}

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
