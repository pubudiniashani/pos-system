export default class ItemModal{

    constructor(itemId,itemName,price,quantity) {
        this._itemId = itemId;
        this._itemName = itemName;
        this._price = price;
        this._quantity = quantity;
    }


    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}