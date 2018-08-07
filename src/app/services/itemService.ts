import { ApiService } from "./apiService";
import { Injectable } from "@angular/core";
@Injectable()
export class itemService {
    constructor(
        private apiService: ApiService
    ) {
    }
    async getItems() {
        let data = await this.apiService.getData('/items').toPromise();
        console.log(data)
        return data;
    }
}