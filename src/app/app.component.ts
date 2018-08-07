import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { itemService } from './services/itemService';
import { ApiService } from './services/apiService';
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
  deletedItemIndex
  error_msgs
  createItem
  editItemForm
  constructor(
    private itemService: itemService,
    private apiService: ApiService,
    private formbuilder: FormBuilder,
  ) {
  }

  initForm() {

    let form = {
      ItemName: ['', [<any>Validators.required]],
      Price: ['', [<any>Validators.required]],
      Photo: ['', [<any>Validators.required]],
      ExpireDate: ['', [<any>Validators.required]],
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
        required: 'قم بادخال رابط الصوره '
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
        required: 'قم بادخال رابط الصوره '
      },
      ExpireDate: {
        required: 'قم بادخال تاريخ الانتهاء ',
      }
    }
    this.initErrorObj();
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
}
