/**
 * Función para enviar datos a server node
 */

async function sendData(dato) {
    await fetch('https://cd76efaa.ngrok.io', {
            method: 'POST',
            body: JSON.stringify(dato),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
}

/**
 * 
 * Función para crear un curso
 */
async function createCourse(dataCourse) {
    await fetch('https://cd76efaa.ngrok.io', {
            method: 'POST',
            body: JSON.stringify(dataCourse),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
}

/* Javascript for LabProgXBlock. */
function LabProgXBlock(runtime, element) {

    var handlerUrl = runtime.handlerUrl(element, 'show_user_data');

    // Datos del usuario
    function getName(result) {
        $('.nombre', element)

        var name = result.nombre
        var email = result.email
        var full_name = result.fullName
        var idUser = result.idUser

        var dato = {
            name: name,
            email: email,
            full_name,
            idUser
        }
        console.log("result", result);

        sendData(dato)
    }

    $('p', element).click(function (eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({
                "hello": "world"
            }),
            success: updateCount
        });
    });

    $('.banderas_comp', element).click(function (eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({
                "hello": "world"
            }),
            success: getName
        })
    })

    ace.config.set('basePath', '/static/js/src/src-min-noconflict')
    var editor = ace.edit('editor');

    editor.getSession().setMode("ace/mode/c_cpp");
    editor.getSession().setUseWorker(false);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    ace.require("/static/js/src/src-min-noconflict/ext-language_tools");

    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true
    });
    editor.setBehavioursEnabled(true);
    editor.setValue(`//Ingresa el código aquí`);


    var botonDescarga = document.getElementById('btn_descargar');

    botonDescarga.addEventListener('click', function () {
        var link = document.getElementById('a_descargar');
        link.href = save(editor.getValue());
    }, false);

    //Descargar Archivos
    function save(textFile) {
        var data = new Blob([textFile], {
            type: 'text/plain'
        });
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    //Subir Archivos
    document.getElementById('file-input').addEventListener('change', readSingleFile, true);

    function readSingleFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            editor.setValue(contents);
        };
        reader.readAsText(file);
    }

    //Expandir
    $('.logo-max', element).click(function (eventObject) {
        let elem = document.getElementById("editor");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen();
        }
    });
}