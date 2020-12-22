$(document).ready(function () {

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


    $("#formPost").submit(function (e) {
        e.preventDefault();
        const data = new FormData(this);

        $.ajax({
            type: "POST",
            url: "/post",
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {
                alert(response);
                window.location.replace("/waitconfirm")
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }

        })

        // --------------- Select Want to Donate ----------------
        const Want = $("input[name = 'Want']:checked").val();
        if (Want.length == 0) {
            alert("Please Select You Want")
        }
        var value = ""
        for (let i = 0; i < Want.length; i++) {
            value = value + Want[i].value
        }
        // If check this box is NOT NULL
        if (Want == "Money") {
            (Amountmoney != "" && BankAccount != "");
            if (Amountmoney == "" || BankAccount == "") {

            }
        }
        else if (Want = Things) {
            (Thinglist != "" && ThingNumber != "");
        }

    });

    $("#btnHome").on("click", function () {
        window.location.replace("/welcome");
    })
});
// });