const forsDescriptions = {};
//Buscando campos vacios en las cajas de texto de las descripciones dinamicas
forsDescriptions.searchSpacesEmpty = function (descriptions){
    for(var i =0; i <descriptions.length;i++){
       
        if(descriptions[i].titulo.toString() ==''){
           
            return 'No pueden haber titulos de las descripciones vacios!';
        }
        if(descriptions[i].contenido.toString() ==''){
            
            return 'No pueden haber contenidos de las descripciones vacios!';
        }
        if(descriptions[i].ubicacion.toString() ==''){
            
            return 'No pueden haber ubicaciones de la descripciones vacios!';
        }
    }
    return undefined;
}

//Buscando ubicaciones repetidas dentro del objeto de descripciones
forsDescriptions.locationsRepeated = function(descriptions){
                var contador = 0;
                  
                  for(var i =0 ; i < descriptions.length;i++){

                        for(var j =0 ; j < descriptions.length;j++){
                                if(descriptions[i].ubicacion.toString() === descriptions[j].ubicacion.toString()){
                                      contador++;
                              }
                        }

                        if(contador >1){
                           return 'No pueden existir ubicaciones iguales!';
                        }

                        contador = 0;
                  }
        return undefined;
}


forsDescriptions.checkLocationInDescriptions = function(compare,arrayDescriptions){
    console.log(arrayDescriptions);
    for(var i =0; i < arrayDescriptions.length;i++){
         
        var locationJson = arrayDescriptions[i].ubicacion;
        var locationNew = compare;
       if(locationNew.toString() === locationJson.toString()){
           return true;
           
       }else{
           return false;
       }
     }

     return false;

}


forsDescriptions.checkLocationInObject = function(data,index,arrayDescriptions){
    for(var i =0; i<arrayDescriptions.length;i++){
        if( i != index){
            if(data.toString() == arrayDescriptions[i].ubicacion.toString()){
                return true;
            }   
        }
      }

      return false;
}


export default forsDescriptions;