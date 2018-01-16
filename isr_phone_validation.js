function is_valid_phone_number(number) {
		  if (/^(02|03|04|08|09|050|052|053|054|055|056|057|058|059|072|073|074|075|076|077|078|079)[\-\s{1}]?\d{1}[\-\s{1}]?\d{6}$/.test(number)){
		  	return (true)
		  }else {
		  	return (false)
		  }
		}
