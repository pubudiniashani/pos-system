import CustomerModal from "../model/CustomerModal.js";

import {customers} from "../db/db.js";

/*var customers = [];*/

var recordIndex;

function loadTable(){
    $.ajax({
        url: 'http://localhost:8080/customer?all=true',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $("#customer-tbl-body").empty();
            data.forEach(item => {
                var record = `
                    <tr>
                        <th scope="row" class="customer-id-value">${item.customerId}</th>
                        <td class="customer-name-value">${item.customerName}</td>
                         <td class="customer-address-value">${item.address}</td>
                        <td class="customer-contact-value">${item.contactNumber}</td>
                    </tr>
                `;
                $("#customer-tbl-body").append(record);
            });
        },
        error: function (xhr, status, error) {
            console.error('Failed to load customers:', error);
        }
    });

}

/*$("#customer-tbl-body").empty();

    customers.map((item, index) =>{

        let record = `<tr>
            <th scope="row" class="customer-id-value">${item.id}</th>
            <td class="customer-name-value">${item.name}</td>
            <td class="customer-address-value">${item.address}</td>
            <td class="customer-contact-value">${item.contact}</td>
        </tr>`;

        // console.log(record);

        $("#customer-tbl-body").append(record);

    });*/





$('#customer-add').on('click',()=>{


    var cusId = $('#customerId').val().trim();
    var cusName = $('#name').val().trim();
    var cusAddress = $('#address').val().trim();
    var cusContact = $('#contact').val().trim();

    // Regular expressions for validation
    var idPattern = /^[0-9]+$/;
    var nameAddressPattern = /^[A-Za-z\s]+$/;
    var contactPattern = /^[0-9]{10}$/;

    //me tyenne kalin use krpu ewa JSON ekt
    console.log(cusId);
    console.log(cusName);
    console.log(cusAddress);
    console.log(cusContact);
    var isValid = true;


    if (!idPattern.test(cusId)) {
        alert('Customer ID should only contain numbers.');
        isValid = false;
    }


    if (!nameAddressPattern.test(cusName)) {
        alert('Name should only contain letters.');
        isValid = false;
    }


    if (!nameAddressPattern.test(cusAddress)) {
        alert('Address should only contain letters.');
        isValid = false;
    }


    if (!contactPattern.test(cusContact)) {
        alert('Contact should be exactly 10 digits.');
        isValid = false;
    }


    let customer = {
        customerId: cusId,
        customerName: cusName,
        address: cusAddress,
        contactNumber: cusContact
    };
    $.ajax({
        url: "http://localhost:8080/customer",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving customer:", xhr.responseText);
            alert("Failed to save customer. Please try again.");
        }
    });

    loadTable();

});





$('#customer-update').on('click', () => {
    var cusId = $('#customerId').val().trim();
    var cusName = $('#name').val().trim();
    var cusAddress = $('#address').val().trim();
    var cusContact = $('#contact').val().trim();

    // Regular expressions for validation
    var idPattern = /^[0-9]+$/;
    var nameAddressPattern = /^[A-Za-z\s]+$/;
    var contactPattern = /^[0-9]{10}$/;


    var isValid = true;


    if (!idPattern.test(cusId)) {
        alert('Customer ID should only contain numbers.');
        isValid = false;
    }


    if (!nameAddressPattern.test(cusName)) {
        alert('Name should only contain letters.');
        isValid = false;
    }


    if (!nameAddressPattern.test(cusAddress)) {
        alert('Address should only contain letters.');
        isValid = false;
    }


    if (!contactPattern.test(cusContact)) {
        alert('Contact should be exactly 10 digits.');
        isValid = false;
    }


   /* if (isValid) {
        let customerObj = customers[recordIndex];
        customerObj.id = cusId;
        customerObj.name = cusName;
        customerObj.address = cusAddress;
        customerObj.contact = cusContact;

        console.log("cus1:", customerObj);
        console.log("cus2:", customers[recordIndex]);

        loadTable();
    }*/

    let customer = {
        customerId: cusId,
        customerName: cusName,
        address: cusAddress,
        contactNumber: cusContact
    };
    $.ajax({
        url: "http://localhost:8080/customer",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving customer:", xhr.responseText);
            alert("Failed to update customer. Please try again.");
        }
    });

    loadTable();

});

var customerId = $("#customerId").val();
console.log(customerId);

$("#customer-delete").on('click',()=>{

    /*var cusId = $('#customerId').val();
    console.log(cusId)*/


    /*customers.splice(recordIndex,1)
    loadTable();
    $("#customer-reset").click();*/

    /*let customerId = $("#cusId").val();
        console.log(customerId);
*/
    if (customerId) {
        console.log("im in function")
        $.ajax({
            url: `http://localhost:8080/customer?customerId=${customerId}`,
            type: "DELETE",
            success: function(response) {
                console.log("Customer deleted:", response);
                alert("Customer deleted successfully.");

                // Remove the deleted customer from the customers array
                //customers.splice(recordIndex, 1);

                // Reload the table and reset the form
                loadTable();
                $("#customer-reset").click();
            },
            error: function(xhr, status, error) {
                console.error("Error deleting customer:", xhr.responseText);
                alert("Failed to delete customer. Please try again.");
            }
        });
    } else {
        alert("Please select a customer to delete.");
    }
});

$('#customer-tbl-body').on('click','tr',function (){

    let index = $(this).index();
    recordIndex = index;
    console.log(index);

    let id = $(this).find(".customer-id-value").text();
    let name = $(this).find(".customer-name-value").text();
    let address = $(this).find(".customer-address-value").text();
    let contact = $(this).find(".customer-contact-value").text();

    $("#customerId").val(id);
    $("#name").val(name);
    $("#address").val(address);
    $("#contact").val(contact);


});

$("#customer-reset").on('click', function() {
    $('#customerId, #name, #address, #contact').val('');
});




