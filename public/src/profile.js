$(document).ready(function () {


    // Show User Detail
    $.ajax({
        type: "POST",
        url: "/detailUser",
        success: function (data) {
            $("#Proname").text(data[0].FirstName);
            $("#Name_User").text(data[0].FirstName);
            $("#Usrname_User").text(data[0].Username);
            $("#Address_User").text(data[0].Address);
            $("#Phonenumber_User").text(data[0].PhoneNumber);

        },
        Error: function (xhr) {
            alert(xhr.responseText);
        }
    });

    // ----------- To Post Page --------------
    $("#btnPost").on("click" , function(){
        window.location.replace("/postPage")
    })

    // Sign Out From System
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


    // ------------ Sign Out ------------------
    $("#btnSignout").on("click", function () {

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


    // --------------- Authenticate Profile(Upload Image) -------------------------
    $("#UploadProfile").submit(function (e) {
        e.preventDefault();
        const data = new FormData(this);

        $.ajax({
            type: "POST",
            url: "/authenticate",
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Authenticate Done !!!',
                    showCancelButton: true,
                    confirmButtonText: 'OK'
                })
            },
            fail: function (xhr) {
                alert(xhr.responseText);
            }

        })
        $("#modelAuthentication").modal("hide");
    });

    // --------------------- Check Authenticate -----------------------
    $.ajax({
        type: "POST",
        url: "/checkAuthen",
        success: function(data){

            if(data[0].Upload_Status == null){
                $("#notauthentication").text("Please Authenticate")
                $("#notauthentication").css({ 'color': 'red' })
            }
            else if(data[0].Upload_Status == 1){
                $("#notauthentication").text("Wait Confirm Authenticate")
                $("#notauthentication").css({ 'color': 'blue' })
            }
            else{
                $("#notauthentication").text("Authenticate Done")
                $("#notauthentication").css({ 'color': 'green' })
            }
        }
    })

    // --------------- Edit Profile -----------------
    $("#btnEditProfile").on("click", function () {
        const name = $("#Editname").val();
        const password = $("#EditPassword").val();
        const address = $("#EditAddress").val();
        const phonenumber = $("#EditPhoneNum").val();

        $.ajax({
            type: "POST",
            url: "/editProfile",
            data: { Name: name, Password: password, Address: address, Phonenumber: phonenumber },
            success: function (response) {
                Swal.fire({
                    icone: 'Success',
                    title: 'Corrected Information',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $("#modelEditProfile").modal("hide");
                    }
                })

            },
            error: function (xhr) {
                alert(xhr.responseText);
            }

        })
    })

    // ---------------- Go to History Page ----------------------
    $("#history").on("click", function () {
        window.location.replace("/historypage")
    })

    $("#btnHome").on("click", function () {
        window.location.replace("/welcome")
    })

    $("#btnPost").on("click", function () {
        window.location.replace("/postPage")
    })
});