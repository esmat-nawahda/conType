



$('body').on('click', '#urlCheckBtn', function() {

    var urls=$("#urlsCheckTxt").val();
    // alert(urls);
    urls=urls.split('&').join(',');
    urls=urls.replace(/\r?\n/g, '^');
	
	// urls=cleanAnd(urls);

	$("#wait").css("display", "block");

    console.log(urls);
	$.ajax({
		url : 'server/service.php?url='+urls, // point to server-side PHP script
		dataType : 'text', // what to expect back from the PHP script, if anything
		cache : false,
		contentType : false,
		processData : false,
		type : 'post',
		success : function(data) {
			JSON.stringify(data);
			 var jsonData = JSON.parse(data);
            // var jsonData = JSON.parse(data);
			console.log(jsonData);

			$("#wait").css("display", "none");

			$("#mainContent").html("");


			$.each(jsonData, function(i, item) {
                // var item=JSON.parse(jsonData[i]);
                var contTypeVar=item.contType;
				if(contTypeVar instanceof Array){
					if(item.status==="200")
						contTypeVar=contTypeVar[0];
					else contTypeVar=contTypeVar[1];

				}
				if(contTypeVar.indexOf(";") >= 0){
						contTypeVar=contTypeVar.split(";")[0];
					}
                console.log(item);
                $.ajax({
                    url:"templates/row.html",
                    success: function(tpl){
                        $("#mainContent").append(tplawesome(tpl, [{"url":item.url,"contType":contTypeVar}]));
                    }
                });
            });

		}
	});




});



function cleanAnd(str){
	var strArr=str.split("^");
	newStr="";
	var len=strArr.length;
	for(var i=0;i<len;i++){
		var line=strArr[i];
		if(line.indexOf("&") >= 0){
			line = line.substring(0, line.indexOf('&'));
		}
		
		// alert(line);
		newStr=newStr+line;
		if(i!=len-1) newStr=newStr+"^"
	}
	return newStr;
}