import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CriteriaRequestDto, ICriteriaRequestDto, OrganizationServiceProxy, PaginationInputDto } from '@shared/service-proxies/service-proxies';
import * as saveAs from 'file-saver';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap';
import { CrudOrganizationTitleComponent } from './crud/crud.component';

@Component({
	templateUrl: './organization-title.component.html',
	styleUrls: [
		'./organization-title.component.less'
	],
})

export class OrganizationTitleComponent implements OnInit {

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

	exportExcel(){
		let input = PaginationInputDto.fromJS(this.pagination);
		input.listCriteria = this.listCriteria;
		input.maxCountResult = 9999;
		input.skipCount = 0;
		
		this._organizationServiceProxy.exportExcelOrganizationTitle(input).subscribe(res => {
			saveAs(res.data, res.name);
		})
	}
	
	getAll(){
		let input = PaginationInputDto.fromJS(this.pagination);
		input.listCriteria = this.listCriteria;

		this._organizationServiceProxy.getAll(input).subscribe(res => {
			this.pagination.items = res.items;
			this.pagination.totalCount = res.totalCount;
			_.each(this.pagination.items, item => {
				item.listTitle = JSON.parse(item.titles);
			})
		})
	}

	openDialog(id?){
    
		var modal = this._md.show(CrudOrganizationTitleComponent, {
		  keyboard: false,
		  class: 'md',
		  initialState: {
			title: id ? 'Update departmental titles' : 'Create departmental titles',
			id: id,
			isNew: id ? false : true
		  }
		});
	
		modal.content.onSave.subscribe(res => {
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
