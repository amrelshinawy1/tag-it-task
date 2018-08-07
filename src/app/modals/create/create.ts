import { Component } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/apiService'
@Component({
    selector: 'create-item',
    templateUrl: './create.html',
    styleUrls: ['./create.css']
})
export class DepositePurchase {
    MessagePop: any;
    current_balance: any;
    formMain: any;
    noData: string;
    percent: number;
    outstanding_balance: any;
    transactions: any;
    error: any;
    error_msgs: any;
    public cashInForm: FormGroup;
    public merchantCode: FormGroup;
    public MessageA: string;
    public MessageB: string;
    public modalRef: BsModalRef;
    public sucessObject: any = {};
    private TempObj: any = {};
    constructor(public bsModalRef: BsModalRef, private formbuilder: FormBuilder, public apiService: ApiService) {

        this.initForm();
    }
    initForm() {
        let formvalidation = {
            Mnumber: ['', [<any>Validators.required, <any>Validators.minLength(11), <any>Validators.maxLength(11)]],
            Money: ['', [<any>Validators.required]],
        };
        let formvalidationCode = {
            MpinCode: ['', [<any>Validators.required]],
        }

        this.cashInForm = this.formbuilder.group(formvalidation);
        this.merchantCode = this.formbuilder.group(formvalidationCode)

        this.error_msgs = {
            Mnumber: {
                required: 'this field is required',
                minlength: 'this field must be 11 digits',
                maxlength: 'this field must be 11 digits'
            },
            Money: {
                required: 'this field is required',
            }
        }
        this.initErrorObj();
    }
    initErrorObj() {
        this.error = {
            Mnumber: [],
            Money: []
        }
    }
    modalShow(form, body, modal, valid) {
        this.merchantCode.get('MpinCode').setValue('');
        this.initErrorObj();
        this.MessageA = "";
        if (!valid) {
            let errors_Mnumber = form.controls.Mnumber.errors;
            let errors_Money = form.controls.Money.errors;
            if (errors_Mnumber)
                for (let key in errors_Mnumber) {
                    this.error.Mnumber.push(this.error_msgs.Mnumber[key]);
                };
            if (errors_Money)
                for (let key in errors_Money) {
                    this.error.Money.push(this.error_msgs.Money[key]);
                };
            return;
        }
        this.apiService.getData(body).subscribe((res => {

            if (res.status == 200) {
                this.formMain = form;
                this.sucessObject = res.data.message;
                this.TempObj = body;
                console.log(this.TempObj)
                this.MessageB = '';
                modal.show();
            }
            else
                this.MessageA = res.data.message;
        }))


    }
    public cashIn(form, body, modal, valid, succModal) {
        this.MessageB = "";
        this.TempObj.MpinCode = body.MpinCode;
        if (!valid) {
            this.MessageB = 'this field is required'; return;
        }
        this.apiService.getData(this.TempObj).subscribe((res => {

            if (res.status == 200) {
                modal.hide();
                succModal.show();
                form.reset();
                this.MessagePop = res.data.message;
                this.formMain.reset();
            }
            else
                this.MessageB = res.data.message;
        }))
    }



}