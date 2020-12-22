$(document).ready(function () {
    $("#btnDonate").on("click", function () {
        $("#modalDonate").modal("show");
    })

    $("#btnReport").on("click", function () {
        $("#modalReport").modal("show");
    })

    // --------------------- Show Detail IN Post --------------------------- 
    $.ajax({
        type: "POST",
        url: "/showdetail",
        data: { ID: localStorage.ID },
        success: function (data) {

            $("#imgDonate").prop("src", "Upload/" + data[0].FileImage)
            $("#Title").text(data[0].Post_Title);
            $("#Description").text(data[0].Post_Description);
            $("#Address").text(data[0].Address);
            $("#Amountmoney").text(data[0].AmountMoney);
            $("#Bankaccount").text(data[0].BankAccount);
            $("#textThing").text(data[0].Things_Name);
            $("#wantRecieve").text(data[0].Things_Number);
            $("#countConfirm").text(data[0].Count);
            $("#nameDonate").text(data[0].FirstName);
            
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    })

    $.ajax({
        type: "POST",
        url: "/recieve",
        data: {ID : localStorage.ID},
        success: function(data){
            $("#recieve_Money").text(data[0].Amount_Money_Donate);
            $("#Amountthing").text(data[0].Things_Number_Donate)
        },
        error: function(xhr){
            alert(xhr.responseText);
        }
    })

    // --------------- Show Require Things -----------------
    $.ajax({
        type: "POST",
        url: "/showThings",
        data: { ID: localStorage.ID },
        success: function (data) {
            $("#textWant").text(data[0].Things_Name)
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    })


    // ---------------- Click For Donate ----------------
    $("#btnready").on("click", function () {
        const Things = $("#txtThings").val();
        const Money = $("#txtMoney").val();

        $.ajax({
            type: "POST",
            url: "/donate",
            data: {ID: localStorage.ID , Thingname: Things , Amountmoney: Money},
            success: function(responese){
                alert(responese)
                $("#modalDonate").modal("hide")
            },
            error: function(xhr){
                alert(xhr.responseText)
            }
        })
    })


    $("btnSave").on("click", function () {
        $("#modelEvidence").modal("hide");
        window.location.replace("/welcome")
    })

    $("#btnHome").on("click", function () {
        window.location.replace("/welcome")
    })

    $("#btnPost").on("click", function () {
        window.location.replace("/post")
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



});


// Modal for Evidence Donate file
// $("#modalDonate").modal("hide");
// $("#modelEvidence").modal("show");