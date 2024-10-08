import ItemModal from "../model/ItemModal.js";

import {customers, items} from "../db/db.js";

/*var items = [];*/

var recordindex ;


function loadItemTable(){

    $.ajax({
        url: 'http://localhost:8080/item?all=true',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#item-tbl-body").empty();
            data.forEach(item => {
                var record = `
                    <tr>
                        <th scope="row" class="item-id-value">${item.itemId}</th>
                        <td class="item-name-value">${item.itemName}</td>
                        <td class="item-price-value">${item.price}</td>
                        <td class="item-quantity-value">${item.quantity}</td>
                    </tr>
                `;
                $("#item-tbl-body").append(record);
            });
        },
        error: function (xhr, status, error) {
            console.error('Failed to load items:', error);
        }
    });
}


    /*$("#item-tbl-body").empty();

    items.map((item, index) =>{

        let record = `<tr>
            <th scope="row" class="item-id-value">${item.itemId}</th>
            <td class="item-name-value">${item.itemName}</td>
            <td class="item-price-value">${item.price}</td>
            <td class="item-quantity-value">${item.quantity}</td>
        </tr>`;

        // console.log(record);

        $("#item-tbl-body").append(record);

    });


}*/

$('#item-add').on('click',()=>{
    /*
        var itemId = $('#itemId').val();
        var itemName = $('#itemName').val();
        var itemPrice = $('#price').val();
        var itemQuantity = $('#quantity').val();

        console.log(itemId);
        console.log(itemName);
        console.log(itemPrice);
        console.log(itemQuantity);

        let item = new ItemModal(itemId,itemName,itemPrice,itemQuantity);

        items.push(item);
        console.log(items);

        loadItemTable();*/


    var itemId = $('#itemId').val().trim();
    var itemName = $('#itemName').val().trim();
    var itemPrice = $('#price').val().trim();
    var itemQuantity = $('#quantity').val().trim();

    // Regular expressions for validation
    var idPattern = /^[0-9]+$/;
    var namePattern = /^[A-Za-z\s]+$/;
    var priceQuantityPattern = /^[0-9]+$/;


    console.log(itemId);
    console.log(itemName);
    console.log(price);
    console.log(quantity);


    var isValid = true;


    if (!idPattern.test(itemId)) {
        alert('Item ID should only contain numbers.');
        isValid = false;
    }


    if (!namePattern.test(itemName)) {
        alert('Name should only contain letters.');
        isValid = false;
    }


    if (!priceQuantityPattern.test(itemPrice)) {
        alert('Price should only contain numbers.');
        isValid = false;
    }


    if (!priceQuantityPattern.test(itemQuantity)) {
        alert('Quantity should only contain numbers.');
        isValid = false;
    }


    let item = {
        itemId: itemId,
        itemName: itemName,
        price: itemPrice,
        quantity: itemQuantity
    };

    console.log(item);

    $.ajax({
        url: "http://localhost:8080/item",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving customer:", xhr.responseText);
            alert("Failed to save customer. Please try again.");
        }
    });

    loadItemTable();


});




$('#item-update').on('click', () => {
    var itemId = $('#itemId').val().trim();
    var itemName = $('#itemName').val().trim();
    var itemPrice = $('#price').val().trim();
    var itemQuantity = $('#quantity').val().trim();

    // Regular expressions for validation
    var idPattern = /^[0-9]+$/;
    var namePattern = /^[A-Za-z\s]+$/;
    var priceQuantityPattern = /^[0-9]+$/;


    var isValid = true;


    if (!idPattern.test(itemId)) {
        alert('Item ID should only contain numbers.');
        isValid = false;
    }


    if (!namePattern.test(itemName)) {
        alert('Name should only contain letters.');
        isValid = false;
    }


    if (!priceQuantityPattern.test(itemPrice)) {
        alert('Price should only contain numbers.');
        isValid = false;
    }


    if (!priceQuantityPattern.test(itemQuantity)) {
        alert('Quantity should only contain numbers.');
        isValid = false;
    }


  /*  if (isValid) {
        let itemObj = items[recordindex];
        itemObj.itemId = itemId;
        itemObj.itemName = itemName;
        itemObj.price = itemPrice;
        itemObj.quantity = itemQuantity;

        loadItemTable();
    }*/

    let item = {
        itemId: itemId,
        itemName: itemName,
        price: itemPrice,
        quantity: itemQuantity
    };

    console.log(item);

    $.ajax({
        url: "http://localhost:8080/item",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving customer:", xhr.responseText);
            alert("Failed to save customer. Please try again.");
        }
    });

    loadItemTable();
});


$("#item-delete").on('click',()=>{

    items.splice(recordindex,1)
    loadItemTable();
    $("#item-reset").click();
    console.log(items)
});





$('#item-tbl-body').on('click','tr',function (){

    let index = $(this).index();
    recordindex = index;
    console.log(index);

    let itemId = $(this).find(".item-id-value").text();
    let itemName = $(this).find(".item-name-value").text();
    let price = $(this).find(".item-price-value").text();
    let quantity = $(this).find(".item-quantity-value").text();

    $("#itemId").val(itemId);
    $("#itemName").val(itemName);
    $("#price").val(price);
    $("#quantity").val(quantity);


});

$("#item-reset").on('click', function() {
    $('#itemId, #itemName, #price, #quantity').val('');
});
