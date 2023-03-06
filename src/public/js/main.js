$(function (){
    
    var nick = ' ';

    const socket = io();
    
    // Accedemos a los elementws del DOM

    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');
    
    const nickForm = $("#nick-form");
    const nickName = $("#nick-name");
    const nickError = $("#nick-error");

    const userNames = $("#usersname");


    // Eventos 
    // Enviamos 
    messageForm.submit( e =>{
        e.preventDefault();
        socket.emit('enviar_mensaje', messageBox.val());
        console.log( 'Hola mundo');
        console.log( messageBox.val());
        messageBox.val('');
       });    
      
       // Obtenemos la respuesta del servidor    
       socket.on('nuevo_mensaje', function(datos){
            console.log("Recibi los datos");
            console.log(datos);
            let color =  "#f4f4f4";
            if ( nick == datos.username) {
                color = '#9ff4c5';
            }

            chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b class="msg">${datos.username} :</b><p class="msg">${datos.msg}</p></div>`)
        })        

        socket.on('nuevo_usuario', function(datos){
            console.log("Recibi los usuarios");

            console.log(datos.msg);
            
            console.log(datos );

            let html = '';
            let color = '';
            let salir = '';
            let usuarios = datos.msg;
                                
            for (let i = 0; i < usuarios.length; i++  ) {
                console.log(i);
                console.log(usuarios[i]);
                if (nick == usuarios[i]) {
                    color = "#027f43";
                    salir =`<a class="enlace-salir" href= "/">Salir</a>`; 
                }  else {
                    salir =''; 
                }

                html += `<p style ="color: ${color}">${usuarios[i]} ${salir}</p>`; 
            };

            console.log(html);

            userNames.html(html);

            console.log(userNames.html);
             
            
            /*chat.append(`<div class="msg-area mb-2"><p class="msg">${datos.msg}</p></div>`)*/
        })     

        // Nuevos Usuarios

        nickForm.submit( e=>{
            e.preventDefault();
            console.log('***** nickForm');
            console.log(nickName.val());

            socket.emit('nuevo_usuario', nickName.val(), datos =>{
                console.log('***** datos');
                console.log(datos);
                if(datos){
                    console.log('usuario ' + datos);
                    nick = nickName.val(); 
                    $('#nick-wrap').hide()
                    $('#content-wrap').show();

                } else {
                    nickError.html(`<div class="alert alert-danger">El usuario ya existe</div>`);
                }
                  
            })
        })
    
    
});



