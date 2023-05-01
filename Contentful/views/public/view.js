$.ajax({
    url : '/spaces',
    data : {
        format : 'json'
    },
    error : function () {
        $('#info').html('<p> error occured </p>');
    },
    dataType: 'json',
    success : function(data) {
        let businessArea = Object.keys(data);
        businessArea.shift();
        var myTablediv = document.getElementById("dashboard");
        var table = document.createElement('TABLE');
        table.setAttribute("class","collapsible centered striped");
        table.setAttribute("data-collapsible","accordin");
        
        var tableHead = document.createElement('thead');
        table.appendChild(tableHead);
        var theadCell = ['Business Area','Space Count','Total User','Admin','Non Admin','Environment'];
        var headtr = document.createElement('TR');
        tableHead.appendChild(headtr);
     
        for(var i=0;i<theadCell.length;i++) {
            var th = document.createElement('TH');
            th.appendChild(document.createTextNode(theadCell[i]));
            headtr.appendChild(th);
        }

        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);
    }
})