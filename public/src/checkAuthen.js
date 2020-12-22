$(document).ready(function () {
    
        // Show User Detail
        $.ajax({
            type: "POST",
            url: "/getdataUser",
            data: {User: localStorage.User},
            success: function (data) {
                $("#Userimg").prop("src", "UploadProfile/" + data[0].EvidenceFile)
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

        $("#btnConfirm").on("click" , function(){
            $.ajax({
                type: "POST",
                url: "/confirmAuthen",
                data: {User: localStorage.User},
                success: function(response){
                    alert(response)
                },
                error: function(xhr){
                    alert(xhr.responseText)
                }

            })
        })

        $("#btnHome").on("click" , function(){
            window.localtion.replace("/Admin")
        })
});