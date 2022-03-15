import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppConsts } from '@shared/AppConsts';
import { CriteriaRequestDto, ICriteriaRequestDto, OrganizationServiceProxy, PaginationInputDto } from '@shared/service-proxies/service-proxies';
import { saveAs } from 'file-saver';
import { BsModalService } from 'ngx-bootstrap';
import { CrudOrganizationComponent } from './crud/crud.component';

@Component({
	templateUrl: './organization.component.html',
	styleUrls: [
		'./organization.component.less'
	],
})
export class OrganizationComponent implements OnInit {

	pagination = null;

	listCriteria:CriteriaRequestDto[] = null;

	constructor(
		private _organizationServiceProxy:OrganizationServiceProxy,
		private readonly _md: BsModalService,
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

		this._organizationServiceProxy.getAll(input).subscribe(res => {
			this.pagination.items = res.items;
			this.pagination.totalCount = res.totalCount;
		})
	}

	exportExcel(){
		let input = PaginationInputDto.fromJS(this.pagination);
		input.listCriteria = this.listCriteria;
		input.maxCountResult = 9999;
		input.skipCount = 0;
		
		this._organizationServiceProxy.exportExcelDefault(input).subscribe(res => {
			saveAs(res.data, res.name);
		})
	}

	openDialog(id?){
    
		var modal = this._md.show(CrudOrganizationComponent, {
		  keyboard: false,
		  class: 'md',
		  initialState: {
			title: id ? 'Update department' : 'Create a department',
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
