import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { itemService } from './services/itemService';
import { ApiService } from './services/apiService';
import { imageUploadService } from './services/imageUploadService';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  dtOptions
  items
  error
  head
  body
  deletedItem
  selectedFile: File = null;
  deletedItemIndex
  error_msgs
  createItem
  editItemForm
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    dayLabels: { su: 'الاحد', mo: 'الاتنين', tu: 'الثلاثاء', we: 'الاربعاء', th: 'الخميس', fr: 'الجمعه', sa: 'السبت' },
    monthLabels: { 1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل', 5: 'مايو', 6: 'يونيو', 7: 'يوليو', 8: 'أغسطس', 9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر' }
  };
  constructor(
    private itemService: itemService,
    private apiService: ApiService,
    private imageUploadService: imageUploadService,
    private formbuilder: FormBuilder,
  ) {
  }

  initForm() {

    let form = {
      ItemName: ['', [<any>Validators.required]],
      Price: ['', [<any>Validators.required]],
      Photo: ['', [<any>Validators.required]],
      ExpireDate: [null, [<any>Validators.required]],
    }

    this.createItem = this.formbuilder.group(form)

    this.error_msgs = {
      ItemName: {
        required: 'قم بادخال الاسم '
      },
      Price: {
        required: 'قم بادخال السعر ',
      },
      Photo: {
        required: 'قم بادخال الصوره '
      },
      ExpireDate: {
        required: 'قم بادخال تاريخ الانتهاء ',
      }
    }
    this.initErrorObj();
  }


  editForm(item) {

    let form = {
      ItemId: [item.ItemId],
      ItemName: [item.ItemName, [<any>Validators.required]],
      Price: [item.Price, [<any>Validators.required]],
      Photo: [item.Photo, [<any>Validators.required]],
      ExpireDate: [item.ExpireDate, [<any>Validators.required]],
    }

    this.editItemForm = this.formbuilder.group(form)

    this.error_msgs = {
      ItemName: {
        required: 'قم بادخال الاسم '
      },
      Price: {
        required: 'قم بادخال السعر ',
      },
      Photo: {
        required: 'قم بادخال الصوره '
      },
      ExpireDate: {
        required: 'قم بادخال تاريخ الانتهاء ',
      }
    }
    this.initErrorObj();
  }

  uploadImage(event) {
    this.selectedFile = event.target.files[0];
    this.imageUploadService.post(this.selectedFile).subscribe(data => {
      if (data.res.ok) {
        this.createItem.controls['Photo'].setValue(`http://task.taj-it.com/UploadImage/${this.selectedFile.name}`);
        this.editItemForm.controls['Photo'].setValue(`http://task.taj-it.com/UploadImage/${this.selectedFile.name}`);
      }
      console.log(data)
    }, error => {
      console.log(error);
    });
  }

  initErrorObj() {
    this.error = {
      ItemName: [],
      Price: [],
      Photo: [],
      ExpireDate: []
    }
  }

  async ngOnInit() {
    this.initForm()
    this.items = await this.itemService.getItems();
    this.dtOptions = {
      "lengthChange": false,
      "bInfo": false,
      language: {
        search: "البحث",
        loadingRecords: "تحميل...",
        zeroRecords: "لا توجد بيانات",
        emptyTable: "لا توجد بيانات",
        paginate: {
          previous: "السابق",
          next: "التالي",
        },
      }
    }
  }
  async create(form, body, modal, valid, succModal) {

    if (!valid) {
      let name_error = form.controls.ItemName.errors;
      let price_error = form.controls.Price.errors;

      let photo_error = form.controls.Photo.errors;
      let expiredate_error = form.controls.ExpireDate.errors;
      if (name_error)
        for (let key in name_error) {
          this.error.ItemName.push(this.error_msgs.ItemName[key]);
        };
      if (price_error)
        for (let key in price_error) {
          this.error.Price.push(this.error_msgs.Price[key]);
        };
      if (photo_error)
        for (let key in photo_error) {
          this.error.Photo.push(this.error_msgs.Photo[key]);
        };
      if (expiredate_error)
        for (let key in expiredate_error) {
          this.error.ExpireDate.push(this.error_msgs.ExpireDate[key]);
        };
      return;
    }
    body.ExpireDate = body.ExpireDate.formatted
    let result = await this.apiService.postItem('/Items', body).toPromise();
    if (result) {
      form.reset();
      modal.hide();
      this.head = "اضافه منتج جديد"
      this.body = "تم اضافه منتج جديد بنجاح "
      succModal.show();
    }
    return;
  }
  async editItem(form, body, modal, valid, succModal) {
    if (!valid) {
      let name_error = form.controls.ItemName.errors;
      let price_error = form.controls.Price.errors;

      let photo_error = form.controls.Photo.errors;
      let expiredate_error = form.controls.ExpireDate.errors;
      if (name_error)
        for (let key in name_error) {
          this.error.ItemName.push(this.error_msgs.ItemName[key]);
        };
      if (price_error)
        for (let key in price_error) {
          this.error.Price.push(this.error_msgs.Price[key]);
        };
      if (photo_error)
        for (let key in photo_error) {
          this.error.Photo.push(this.error_msgs.Photo[key]);
        };
      if (expiredate_error)
        for (let key in expiredate_error) {
          this.error.ExpireDate.push(this.error_msgs.ExpireDate[key]);
        };
      return;
    }
    console.log(body.ExpireDate)
    body.ExpireDate = body.ExpireDate.formatted || body.ExpireDate
    let result = await this.apiService.updateItem(`/Items/${body.ItemId}`, body).toPromise();
    if (result.status == 204) {
      modal.hide();
      this.head = "تعديل منتج "
      this.body = "تم تعديل منتج بنجاح "
      var i = this.items.data.findIndex(o => o.ItemId === body.ItemId);
      this.items.data[i] = body
      succModal.show();
    }
    return;
  }
  async deleteItem(dangerModal, Item, index) {
    let result = await this.apiService.deleteItem(`/Items/${Item.ItemId}`).toPromise();
    if (result) {
      this.items.data.splice(index)
      dangerModal.hide();
    }
    return;
  }

  ShowDeleteModal(modal, item, index) {
    modal.show();
    this.deletedItem = item;
    this.deletedItemIndex = index;
  }
  ShowEditModal(modal, item) {
    this.editForm(item)
    modal.show();
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.createItem.patchValue({
      ExpireDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
    this.editItemForm.patchValue({
      ExpireDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {

    this.editItemForm.patchValue({ ExpireDate: null });
    this.createItem.patchValue({ ExpireDate: null });
  }
}
