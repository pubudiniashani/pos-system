import CustomerModal from "../model/CustomerModal.js";

/*import {customers} from "../db/db.js";*/

var customers = [];

var recordIndex;

function loadTable(){
    $("#customer-tbl-body").empty();

    customers.map((item, index) =>{

        let record = `<tr>
            <th scope="row" class="customer-id-value">${item.id}</th>
            <td class="customer-name-value">${item.name}</td>
            <td class="customer-address-value">${item.address}</td>
            <td class="customer-contact-value">${item.contact}</td>
        </tr>`;

        // console.log(record);

        $("#customer-tbl-body").append(record);

    });

}


$('#customer-add').on('click',()=>{


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
         let customer = new CustomerModal(cusId, cusName, cusAddress, cusContact);
         customers.push(customer);
         console.log(customers);
         loadTable();
         */

    let customer = {
        id: customerId,
        name: customerName,
        address: address,
        contact:cusContact
    };
    $.ajax({
        url: "http://localhost:8080/pos-backend/customer",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function(response) {
            $("#text").text("Successfully added new customer")
            $("#successModal").modal("show");
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving customer:", xhr.responseText);
            alert("Failed to save customer. Please try again.");
        }
    });

    loadTable();

});



/*$('#customer-update').on('click',()=>{

        var cusId = $('#customerId').val();
        var cusName = $('#name').val();
        var cusAddress = $('#address').val();
        var cusContact = $('#contact').val();

        let customerObj = customers[recordIndex];
        customerObj.id = cusId;
        customerObj.name = cusName;
        customerObj.address = cusAddress;
        customerObj.contact = cusContact;

        console.log("cus1 :" , customerObj);
        console.log(("cus2 :" , customers[recordIndex]));

        loadTable();

});*/

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


    if (isValid) {
        let customerObj = customers[recordIndex];
        customerObj.id = cusId;
        customerObj.name = cusName;
        customerObj.address = cusAddress;
        customerObj.contact = cusContact;

        console.log("cus1:", customerObj);
        console.log("cus2:", customers[recordIndex]);

        loadTable();
    }
});


$("#customer-delete").on('click',()=>{

    customers.splice(recordIndex,1)
    loadTable();
    $("#customer-reset").click();
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




