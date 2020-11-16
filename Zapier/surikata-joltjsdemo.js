switch(input.status){
  case "new":
    output = [{subject: "Your order is a new order", body: "Your order was received"}];
    break;
  case "processing":
    output = [{subject: "Your order is being processed", body: "Your order is being processed"}];
    break;
  case "delivered":
    output = [{subject: "Your order was delivered", body: "Your order was delivered yo yo yo"}];
    break;
}
