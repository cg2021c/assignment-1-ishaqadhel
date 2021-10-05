var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 uChange;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = uChange * vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

function main () {
	console.log('This is working');

	var canvas = document.getElementById('myCanvas');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	// gl.clearColor(0.8, 0.7, 0.5, 1.0);
	// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Create shaders
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

    gl.useProgram(program);

	var vertices = 
	[   // X, Y,        R, G, B

        // Bottom Rectangle
		-0.2, -0.9,     0.5, 0.8, 0.0,      // point B
		-0.6, -0.9,     0.6, 0.1, 0.0,      // point A
		-0.6,  0.2,     0.5, 0.7, 0.5,      // point C

		-0.2,  0.2,     0.6, 0.1, 0.0,      // point D
        -0.2, -0.9,     0.5, 0.8, 0.0,      // point B
        -0.6,  0.2,     0.5, 0.7, 0.5,      // point C

        // Middle Rectangle
        -0.2,  0.2,     0.0, 0.0, 0.0,      // Point D
        -0.6,  0.3,     0.0, 0.0, 0.0,      // Point E
        -0.6,  0.2,     0.0, 0.0, 0.0,      // point C

        -0.2,  0.2,     0.0, 0.0, 0.0,      // Point D
        -0.6,  0.3,     0.0, 0.0, 0.0,      // Point E
        -0.2,  0.3,     0.0, 0.0, 0.0,      // Point F

        // Top Rectangle
        -0.45, 0.3,     0.0, 0.0, 0.0,      // Point E'
        -0.2,  0.3,     0.0, 0.0, 0.0,      // Point F
        -0.45, 0.4,     0.0, 0.0, 0.0,      // Point G

        -0.2,  0.3,     0.0, 0.0, 0.0,      // Point F
        -0.45, 0.4,     0.0, 0.0, 0.0,      // Point G
        -0.2,  0.4,     0.0, 0.0, 0.0,      // Point H

        // Gas Push Button
        -0.45, 0.4,     0.0, 0.0, 0.0,      // Point G
        -0.6,  0.4,     0.0, 0.0, 0.0,      // Point G'
        -0.6,  0.35,    0.0, 0.0, 0.0,      // Point I

        -0.45, 0.4,     0.0, 0.0, 0.0,      // Point G
        -0.6,  0.35,    0.0, 0.0, 0.0,      // Point I
        -0.45, 0.35,    0.0, 0.0, 0.0,      // Point I'

        // Below Push Button to Trigger Gas Out
        -0.45, 0.35,    0.0, 0.0, 0.0,      // Point I'
        -0.5,  0.35,    0.0, 0.0, 0.0,      //Point I''
        -0.5,  0.31,    0.0, 0.0, 0.0,      // Point EI

        -0.5,  0.35,    0.0, 0.0, 0.0,      //Point I''
        -0.5,  0.31,    0.0, 0.0, 0.0,      // Point EI
        -0.55, 0.35,    0.0, 0.0, 0.0,      //Point I'''

        -0.5,  0.31,    0.0, 0.0, 0.0,      // Point EI
        -0.55, 0.35,    0.0, 0.0, 0.0,      //Point I'''
        -0.55, 0.31,    0.0, 0.0, 0.0,      // Point EI'

        // Toggle switch fire power
        -0.2,   0.3,     0.0, 0.0, 0.0,      // Point F
        -0.17,  0.3,     0.0, 0.0, 0.0,      // Point F'
        -0.17,  0.32,    0.0, 0.0, 0.0,      // Point F''

        -0.2,   0.3,     0.0, 0.0, 0.0,      // Point F
        -0.17,  0.32,    0.0, 0.0, 0.0,      // Point F''
        -0.2,  0.32,    0.0, 0.0, 0.0,      // Point F'''

        // Top Trapesium
        -0.2,  0.4,     0.0, 0.0, 0.0,      // Point H
        -0.35, 0.4,     0.0, 0.0, 0.0,      // Point H'
        -0.35, 0.5,     0.0, 0.0, 0.0,      // Point H''

        -0.35, 0.4,     0.0, 0.0, 0.0,      // Point H'
        -0.35, 0.5,     0.0, 0.0, 0.0,      // Point H''
        -0.45, 0.5,    0.0, 0.0, 0.0,      // Point H''

        -0.45, 0.4,     0.0, 0.0, 0.0,     // Point G
        -0.35, 0.4,     0.0, 0.0, 0.0,      // Point H'
        -0.45, 0.5,     0.0, 0.0, 0.0,     // Point O

        // Bottom Rectangle Right
		0.4, -0.9,     0.5, 0.8, 0.0,      // point B
		0.0, -0.9,     0.6, 0.1, 0.0,      // point A
		0.0,  0.2,     0.5, 0.7, 0.5,      // point C

		0.4,  0.2,     0.6, 0.1, 0.0,      // point D
        0.4, -0.9,     0.5, 0.8, 0.0,      // point B
        0.0,  0.2,     0.5, 0.7, 0.5,      // point C

        // Middle Rectangle Right
        0.4,  0.2,     0.0, 0.0, 0.0,      // Point D
        0.0,  0.3,     0.0, 0.0, 0.0,      // Point E
        0.0,  0.2,     0.0, 0.0, 0.0,      // point C

        0.4,  0.2,     0.0, 0.0, 0.0,      // Point D
        0.0,  0.3,     0.0, 0.0, 0.0,      // Point E
        0.4,  0.3,     0.0, 0.0, 0.0,      // Point F

         // Top Rectangle Right
         0.15, 0.3,     0.0, 0.0, 0.0,      // Point E'
         0.4,  0.3,     0.0, 0.0, 0.0,      // Point F
         0.15, 0.4,     0.0, 0.0, 0.0,      // Point G
 
         0.4,  0.3,     0.0, 0.0, 0.0,      // Point F
         0.15, 0.4,     0.0, 0.0, 0.0,      // Point G
         0.4,  0.4,     0.0, 0.0, 0.0,      // Point H
        
         // Gas Push Button
        0.15, 0.4,     0.0, 0.0, 0.0,      // Point G
        0.0,  0.4,     0.0, 0.0, 0.0,      // Point G'
        0.0,  0.35,    0.0, 0.0, 0.0,      // Point I

        0.15, 0.4,     0.0, 0.0, 0.0,      // Point G
        0.0,  0.35,    0.0, 0.0, 0.0,      // Point I
        0.15, 0.35,    0.0, 0.0, 0.0,      // Point I'

        // Below Push Button to Trigger Gas Out
        0.15, 0.35,    0.0, 0.0, 0.0,      // Point I'
        0.1,  0.35,    0.0, 0.0, 0.0,      //Point I''
        0.1,  0.31,    0.0, 0.0, 0.0,      // Point EI

        0.1,  0.35,    0.0, 0.0, 0.0,      //Point I''
        0.1,  0.31,    0.0, 0.0, 0.0,      // Point EI
        0.05, 0.35,    0.0, 0.0, 0.0,      //Point I'''

        0.1,  0.31,    0.0, 0.0, 0.0,      // Point EI
        0.05, 0.35,    0.0, 0.0, 0.0,      //Point I'''
        0.05, 0.31,    0.0, 0.0, 0.0,      // Point EI'

        // Toggle switch fire power
        0.4,   0.3,     0.0, 0.0, 0.0,      // Point F
        0.43,  0.3,     0.0, 0.0, 0.0,      // Point F'
        0.43,  0.32,    0.0, 0.0, 0.0,      // Point F''

        0.4,   0.3,     0.0, 0.0, 0.0,      // Point F
        0.43,  0.32,    0.0, 0.0, 0.0,      // Point F''
        0.4,  0.32,    0.0, 0.0, 0.0,      // Point F'''

        // Top Trapesium
        0.4,  0.4,     0.0, 0.0, 0.0,      // Point H
        0.25, 0.4,     0.0, 0.0, 0.0,      // Point H'
        0.25, 0.5,     0.0, 0.0, 0.0,      // Point H''

        0.25, 0.4,     0.0, 0.0, 0.0,      // Point H'
        0.25, 0.5,     0.0, 0.0, 0.0,      // Point H''
        0.15, 0.5,    0.0, 0.0, 0.0,      // Point H''

        0.15, 0.4,     0.0, 0.0, 0.0,     // Point G
        0.25, 0.4,     0.0, 0.0, 0.0,      // Point H'
        0.15, 0.5,     0.0, 0.0, 0.0,     // Point O
	];

	var vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		2, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);

	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);


    let uChange = gl.getUniformLocation(program, 'uChange');
    let speed = 0.0167;
    let dy = 0;

    function render() {
        if (dy >= 0.4 || dy <= -0.05) {
            speed = -speed;
        }
		
        dy += speed;
        
		let leftS = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		
		let rightS = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, dy, 0.0, 1.0,
		];

        gl.clearColor(0.8, 0.7, 0.5, 1.0);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(program);
        gl.uniformMatrix4fv(uChange, false, leftS);
        gl.drawArrays(gl.TRIANGLES, 0, 48);

		gl.uniformMatrix4fv(uChange, false, rightS);
        gl.drawArrays(gl.TRIANGLES, 48, 48);
            
        requestAnimationFrame(render);
    }
    render();
};

main();