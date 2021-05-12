

/*

    Tareas:
    ------

    1) Modificar a función "generarSuperficie" para que tenga en cuenta los parametros filas y columnas al llenar el indexBuffer
       Con esta modificación deberían poder generarse planos de N filas por M columnas

    2) Modificar la funcion "dibujarMalla" para que use la primitiva "triangle_strip"

    3) Crear nuevos tipos funciones constructoras de superficies

        3a) Crear la función constructora "Esfera" que reciba como parámetro el radio

        3b) Crear la función constructora "TuboSenoidal" que reciba como parámetro la amplitud de onda, longitud de onda, radio del tubo y altura.
        (Ver imagenes JPG adjuntas)
        
        
    Entrega:
    -------

    - Agregar una variable global que permita elegir facilmente que tipo de primitiva se desea visualizar [plano,esfera,tubosenoidal]
    
*/


var superficie3D;
var mallaDeTriangulos;

var filas=50;
var columnas=50;
var figura = "tubo";



function crearGeometria(){
        
    switch (figura) {
        case "plano":
            superficie3D=new Plano(3,3);

          break;
        case "esfera":
            superficie3D=new Esfera(1.5);

          break;
        
        case "tubo":
            superficie3D=new TuboSenoidal(0.1,0.5, 1, 2.5);

          break;
        default:
            superficie3D=new Plano(3,3);

          break;
      }
    mallaDeTriangulos=generarSuperficie(superficie3D,filas,columnas);
    
}

function dibujarGeometria(){

    dibujarMalla(mallaDeTriangulos);

}

function Plano(ancho,largo){

    this.getPosicion=function(u,v){

        var x=(u-0.5)*ancho;
        var z=(v-0.5)*largo;
        return [x,0,z];
    }

    this.getNormal=function(u,v){
        return [0,1,0];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function Esfera(radio){

    this.getPosicion=function(u,v){
     let normal = this.getNormal(u,v);
     return normal.map(componente => componente * radio)
    }

    this.getNormal=function(u,v){
        let theta = v*Math.PI;
        let phi =  u * 2* Math.PI
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);
        let sinPhi = Math.sin(phi);
        let cosPhi = Math.cos(phi);
        let x = cosPhi * sinTheta*radio;
        let y = cosTheta*radio;
        let z = sinPhi * sinTheta*radio;
        return [x,y,z];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}

function TuboSenoidal(amplitudOnda, longOnda, radio, altura){

    this.getPosicion=function(u,v){
        let phi =  u * 2* Math.PI;
        let sinPhi = Math.sin(phi);
        let cosPhi = Math.cos(phi);
     
        let y = (v-0.5) * altura;
        let r = radio + amplitudOnda * Math.sin(y * 2*Math.PI / longOnda - 1/2*Math.PI );
        return [ r* cosPhi, y , r*sinPhi];
    }

    this.getNormal=function(u,v){ 
        let y = (v-0.5) * altura;

        let phi =  u * 2* Math.PI;
        let r = radio + amplitudOnda * Math.sin(y * 2*Math.PI / longOnda - 1/2*Math.PI);

        let xPrimaPhi = -r*Math.sin(phi);
        let yPrimaPhi = 0;
        let zPrimaPhi = r * Math.cos(phi);

        let xPrimaY =  amplitudOnda * Math.cos(y * 2*Math.PI / longOnda - 1/2*Math.PI) * (2*Math.PI/longOnda) * Math.cos(phi);
        let yPrimaY = 1;
        let zPrimaY = amplitudOnda * Math.cos(y * 2*Math.PI / longOnda - 1/2*Math.PI) * (2*Math.PI/longOnda) * Math.sin(phi);

        let normalX = -(yPrimaPhi * zPrimaY - zPrimaPhi * yPrimaY);
        let normalY = - (zPrimaPhi * xPrimaY - xPrimaPhi * zPrimaY);
        let normalZ = -(xPrimaPhi * yPrimaY - yPrimaPhi * xPrimaY);

        let hipo = (normalX**2 + normalY**2 + normalZ **2)**0.5;

        return [normalX/hipo, normalY/hipo , normalZ/hipo ];
    }

    this.getCoordenadasTextura=function(u,v){
        return [u,v];
    }
}


function generarSuperficie(superficie,filas,columnas){
    
    positionBuffer = [];
    normalBuffer = [];
    uvBuffer = [];

    for (var i=0; i <= filas; i++) {
        for (var j=0; j <= columnas; j++) {

            var u=j/columnas;
            var v=i/filas;

            var pos=superficie.getPosicion(u,v);

            positionBuffer.push(pos[0]);
            positionBuffer.push(pos[1]);
            positionBuffer.push(pos[2]);

            var nrm=superficie.getNormal(u,v);

            normalBuffer.push(nrm[0]);
            normalBuffer.push(nrm[1]);
            normalBuffer.push(nrm[2]);

            var uvs=superficie.getCoordenadasTextura(u,v);

            uvBuffer.push(uvs[0]);
            uvBuffer.push(uvs[1]);

        }
    }



    // Buffer de indices de los triángulos
    
    //indexBuffer=[0,1,2,2,1,3]; // Estos valores iniciales harcodeados solo dibujan 2 triangulos, REMOVER ESTA LINEA!
    indexBuffer=[];  

    for (i=0; i < filas; i++) {
        for (j=0; j < columnas; j++) {

            // completar la lógica necesaria para llenar el indexbuffer en funcion de filas y columnas
            // teniendo en cuenta que se va a dibujar todo el buffer con la primitiva "triangle_strip"
            indexBuffer.push(j + (columnas + 1) * (i ) );
            indexBuffer.push((columnas + 1) * (i + 1)  + j );
         
        }
        indexBuffer.push((columnas) + (columnas + 1) * (i ));
        indexBuffer.push((columnas + 1) * (i + 1)  + columnas );

        if(filas - 1 > i){
            indexBuffer.push((columnas + 1) * (i + 1)  + columnas );
            indexBuffer.push((columnas +1) * (i + 1) );
        }
        

    }

    // Creación e Inicialización de los buffers

    webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionBuffer), gl.STATIC_DRAW);
    webgl_position_buffer.itemSize = 3;
    webgl_position_buffer.numItems = positionBuffer.length / 3;

    webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalBuffer), gl.STATIC_DRAW);
    webgl_normal_buffer.itemSize = 3;
    webgl_normal_buffer.numItems = normalBuffer.length / 3;

    webgl_uvs_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, webgl_uvs_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvBuffer), gl.STATIC_DRAW);
    webgl_uvs_buffer.itemSize = 2;
    webgl_uvs_buffer.numItems = uvBuffer.length / 2;


    webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);
    webgl_index_buffer.itemSize = 1;
    webgl_index_buffer.numItems = indexBuffer.length;

    return {
        webgl_position_buffer,
        webgl_normal_buffer,
        webgl_uvs_buffer,
        webgl_index_buffer
    }
}

function dibujarMalla(mallaDeTriangulos){
    
    // Se configuran los buffers que alimentaron el pipeline
    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_position_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mallaDeTriangulos.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_uvs_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mallaDeTriangulos.webgl_uvs_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mallaDeTriangulos.webgl_normal_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mallaDeTriangulos.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);
       
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mallaDeTriangulos.webgl_index_buffer);


    if (modo!="wireframe"){
        gl.uniform1i(shaderProgram.useLightingUniform,(lighting=="true"));                    
        /*
            Aqui es necesario modificar la primitiva por triangle_strip
        */
        gl.drawElements(gl.TRIANGLE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    
    if (modo!="smooth") {
        gl.uniform1i(shaderProgram.useLightingUniform,false);
        gl.drawElements(gl.LINE_STRIP, mallaDeTriangulos.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
 
}

