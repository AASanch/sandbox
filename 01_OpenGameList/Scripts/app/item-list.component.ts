import { Component, OnInit } from "@angular/core";
import { ItemService } from "./item.service";
import { Item } from "./item";

@Component({
    selector : "item-list",
    templateUrl: "./app/item-list.component.html",
    styleUrls: [ "./app/item-list.component.css" ]
})
export class ItemListComponent implements OnInit {
    items: Array<Item>;
    errorMessage: string;
    
    constructor(private itemService: ItemService) {
    }

    public ngOnInit(): void {
        this.itemService.getLatest()
            .subscribe(
                latestItems => this.items = latestItems,
                error => this.errorMessage = <any>error);            
    }
}