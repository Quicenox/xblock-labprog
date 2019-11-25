/* Javascript for LabProgXBlock. */
function LabProgXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    ace.config.set('basePath','/static/js/src/src-min-noconflict')
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
    editor.setValue(`//put your code here.`);


    var botonDescarga = document.getElementById('btn_descargar');

    botonDescarga.addEventListener('click', function () {
        var link = document.getElementById('a_descargar');
        link.href = save(editor.getValue());
    }, false);

    //Descargar Archivos
    function save(textFile) {
        var data = new Blob([textFile], { type: 'text/plain' });
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
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    });
}
