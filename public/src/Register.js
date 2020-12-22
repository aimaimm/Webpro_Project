$(document).ready(function () {
    $("#btnSignin").on("click", function () {
        const Firstname = $("#txtFirstname").val();
        const Lastname = $("#txtLastname").val();
        const Username = $("#txtUsername").val();
        const Password = $("#txtPassword").val();
        const Phonenumber = $("#txtPhonenumber").val();
        const Address = $("#txtAddress").val();

        $.ajax({
            type: "POST",
            url: "/signupuser",
            data: { Firstname: Firstname, Lastname: Lastname, Username: Username, Password: Password, PhoneNumber: Phonenumber, Address: Address },
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Register Done !!!',
                    showCancelButton: true,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/")
                    }
                })
            },
            error: function (xhr) {
                alert(xhr.responseText)
            }
        })

    })



});
