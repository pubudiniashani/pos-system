export default class OrderModal{

    constructor(itemId, description, unitPrice, quantityOnHand, orderQuantity) {
        this._itemId = itemId;
        this._description = description;
        this._unitPrice = unitPrice;
        this._quantityOnHand = quantityOnHand;
        this._orderQuantity = orderQuantity;
    }


    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get quantityOnHand() {
        return this._quantityOnHand;
    }

    set quantityOnHand(value) {
        this._quantityOnHand = value;
    }

    get orderQuantity() {
        return this._orderQuantity;
    }

    set orderQuantity(value) {
        this._orderQuantity = value;
    }
}