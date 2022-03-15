import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppConsts } from '@shared/AppConsts';
import { CriteriaRequestDto, ICriteriaRequestDto, PaginationInputDto, TitleServiceProxy } from '@shared/service-proxies/service-proxies';
import * as saveAs from 'file-saver';
import { BsModalService } from 'ngx-bootstrap';
import { CrudTitleComponent } from './crud/crud.component';

@Component({
	templateUrl: './title.component.html',
	styleUrls: [
		'./title.component.less'
	],
})
export class TitleComponent implements OnInit {

	pagination = null;
	listCriteria:CriteriaRequestDto[] = null;
	
	constructor(
		private _titleServiceProxy:TitleServiceProxy,
		private _md: BsModalService,
		private _fb: FormBuilder,
	) {
	}

	ngOnInit() {
		this.resetPagination();
		this.getAll();
	}


	getAll(){
		let input = PaginationInputDto.fromJS(this.pagination);
		input.listCriteria = this.listCriteria;

		this._titleServiceProxy.getAll(input).subscribe(res => {
			this.pagination.items = res.items;
			this.pagination.totalCount = res.totalCount;
		})
	}

	exportExcel(){
		let input = PaginationInputDto.fromJS(this.pagination);
		input.listCriteria = this.listCriteria;
		input.maxCountResult = 9999;
		input.skipCount = 0;
		
		this._titleServiceProxy.exportExcelDefault(input).subscribe(res => {
			saveAs(res.data, res.name);
		})
	}

	openDialog(id?){
    
		var modal = this._md.show(CrudTitleComponent, {
		  keyboard: false,
		  class: 'md',
		  initialState: {
			title: id ? 'Update title' : 'Create title',
			id: id,
			isNew: id ? false : true
		  }
		});
	
		modal.content.onSave.subscribe(res => {
			this.getAll();
		});

		modal.content.onDelete.subscribe(res => {
			this.resetPagination();
			this.getAll();
		});
	}

	private resetPagination(){
		this.setDefaultCriteria();
		this.pagination = {
			items: [],
			totalCount: 0,
			skipCount : 0,
			maxCountResult: 2,
			sorting: 'Name ASC'
		};
	}

	private setDefaultCriteria(){

		this.listCriteria = [
			new CriteriaRequestDto({
				property: 'Name',
				option: 3,
				value: ''
			} as ICriteriaRequestDto)
		];
	}
}
