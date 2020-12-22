$(document).ready(function () {
    $("#btnReport").on("click", function () {
        $("#modalReport").modal("show");
    })

    // alert(localStorage.ID)
    
    $.ajax({
        type: "GET",
        url: "/detailPost",
        success: function (data) {

            $("#imgDonate").prop("src", "Upload/" + data[0].FileImage)
            $("#Title").text(data[0].Post_Title);
            $("#Description").text(data[0].Post_Description);
            $("#Address").text(data[0].Address);
            $("#Amountmoney").text(data[0].AmountMoney);
            $("#BankAccount").text(data[0].BankAccount);
            $("#textThings").text(data[0].Things_Name);
            $("#AmountThings").text(data[0].Things_Number);
            $("#countConfirm").text(data[0].Count);
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    })


    $("#btnsignOut").on("click", function () {
        $.ajax({
            type: "GET",
            url: "/signout",
            success: function (data) {
                window.location.replace(data)
            },
            fail: function (xhr) {
                alert(xhr.responseText);
            }
        })
    })

    $("#btnHome").on("click" , function(){
        window.location.replace("/welcome")
    })

});