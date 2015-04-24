var BasicHttpBinding = require('wcf.js').BasicHttpBinding
  , Proxy = require('wcf.js').Proxy
  , binding = new BasicHttpBinding(
        { 
            //SecurityMode: "TransportWithMessageCredential"
            //, MessageClientCredentialType: "UserName"
        })
  , proxy = new Proxy(binding, "http://localhost:50974/Servicio/SRV_Mantenedores.svc/")
  , message =  "<Envelope xmlns='http://schemas.xmlsoap.org/soap/envelope/'>" +
                 "<Header />" +
                   "<Body>" +
                     "<srv_ListarCalidadesCargo xmlns='http://tempuri.org/'>" +
                       //"<value>123</value>" +
                     "</srv_ListarCalidadesCargo>" +
                    "</Body>" +
               "</Envelope>"
//proxy.ClientCredentials.Username.Username = "yaron"
//proxy.ClientCredentials.Username.Password = "1234"
proxy.send(message, "http://tempuri.org/ISRV_Parametros/srv_ListarCalidadesCargo", function(response, ctx) {
  console.log(response)
});   