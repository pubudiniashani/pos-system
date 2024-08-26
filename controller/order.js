import OrderModal from "../model/OrderModal.js";


import {customers} from "../db/db.js";
import {items} from "../db/db.js";

$("#item-ID").on('input', function() {
    var itemId = $(this).val().trim();


    var item = items.find(i => i.itemId === itemId);

    if (item) {

        $("#item-Name").val(item.itemName);
        $("#item-Price").val(item.price);
        $("#quantityOnHand").val(item.quantity);
    } else {

        $("#item-Name").val('');
        $("#item-Price").val('');
        $("#quantityOnHand").val('');
    }
});



