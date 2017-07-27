var phoneInput = document.querySelector("input[name='phone'")

phoneInput.addEventListener("blur", function() {
	
	var num = document.querySelector("input[name='phone'").value;
	var numarray = num.split('');

	for (i = 0; i < numarray.length; i++) {
			numarray[i] = numarray[i].replace("٠", "0");
			numarray[i] = numarray[i].replace("١", "1");
			numarray[i] = numarray[i].replace("٢", "2");
			numarray[i] = numarray[i].replace("٣", "3");
			numarray[i] = numarray[i].replace("٤", "4");
			numarray[i] = numarray[i].replace("٥", "5");
			numarray[i] = numarray[i].replace("٦", "6");
			numarray[i] = numarray[i].replace("٧", "7");
			numarray[i] = numarray[i].replace("٨", "8");
			numarray[i] = numarray[i].replace("٩", "9");
	}
	var normalnum = numarray.join('');
	document.querySelector("input[name='phone'").value = normalnum;
});
