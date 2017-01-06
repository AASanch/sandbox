import { Component, Input } from "@angular/core";
import { Item } from "./item";

@Component({
    selector: "item-detail",
    templateUrl: "./app/item-detail.component.html",
    styleUrls: [ "./app/item-detail.component.css" ]
})
export class ItemDetailComponent {
    @Input("item") item: Item;
}