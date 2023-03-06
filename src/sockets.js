module.exports = (io) => {

    let nickNames = [];    

    io.on('connection', socket => {
        
        
        // Ak recubir un mensaje recijemos los datos
        
        socket.on('enviar_mensaje', (datos) => {
            console.log('***** Mensaje');
            console.log(datos);
            console.log(socket.nickName);
            console.log('***** Fin');
            
            io.emit('nuevo_mensaje', {
                msg:datos, 
                username: socket.nickName
            })        
        });        
        
        socket.on('nuevo_usuario', (datos, callbak) =>{
            if(nickNames.indexOf(datos) != -1) {
                callbak(false);
            }  else {
                callbak(true);
                socket.nickName = datos;
                nickNames.push(socket.nickName); 

                io.emit('nuevo_usuario', {
                    msg:nickNames
                })       
    

               /* io.emit(nombre_usuario, nickNames); */
            } 
        });
/*
        socket.on('disconnect', datos =>{
            console.log("Borrado ****  $$$$");
            //Si un usuario se desconecta lo eliminamos del array
            if(!socket.nickname){
                return;
            }else{
                //buscamos su posición en el array y lo eliminamos con splice()
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);

                //Enviamos al cliente el array de usuarios actualizado:
                actualizarUsuarios();
            }
        });
*/

        socket.on('disconnect', datos =>{            
            
            if(!socket.nickName) {
                console.log("Paso por el falso" + socket.nickName);
                return;
                
            } else {
                nickNames.splice(nickNames.indexOf(socket.nickName), 1);
                
                console.log("Paso por el verdadero");                
                
                console.log(nickNames)
                io.emit('nuevo_usuario', {
                    msg:nickNames
                })   

            }            
        })
 
    })    
}