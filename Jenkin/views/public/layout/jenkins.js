function viewPod(labelElement) {
    if(labelElement == undefined) {
        $("label").first().addClass("selected");
    }
    else {
        $("labelElement").addClass("selected");
    }

    $.ajax({
        url : "/pods",
        data : {
            format : "json",
        },
        error : function() {

        },
        dataType : "json",
        success : function(data) {
            $("#dashboard").html("");
            var myTableDiv = document.getElementById("dashboard");
        }
    })
}