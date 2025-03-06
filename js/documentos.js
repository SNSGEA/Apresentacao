function UploadDocumento(file,aux) {

    var formData = new FormData();     
    console.log('Verifica : ' + aux);
    if (aux === true) {
        formData.append('file', file);
        $.ajax({
            type: 'post',
            url: 'DocumentoUploader.ashx?params=' + $('#txtidEmpresa').val() + '@' + $('#cmbClienteDocumento').val() + '@' + $('#cmbProcessoDocumento').val() + '@' + $("#cmbProcessoDocumento option:selected").text() +'@'+ file.name +'@'+ $('#cmbTipoDocumento').val()+ '',
            data: formData,
            success: function (status) {
                if (status != 'error') {
                    d = new Date();
                    var timestamp = d.getTime();
                    console.log('Upload Documento: OK -> ' + "../Documentos/" + $('#txtidEmpresa').val() + "/");
                }
            },
            processData: false,
            contentType: false,
            error: function () {
                console.log('Upload Documento: NOK');
            }
        });
    };




}

function GetTiposDocumento(idempresa) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetTiposDocumento',
        data: "{'idEmpresa':'" + idempresa + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {

        var lankanListArray = JSON.parse(data.d);
        // creating html string
        var listString = '<option value="-1"> </option>';
        // running a loop
        $.each(lankanListArray, function (index, value) {
            listString += '<option value="' + this.idTipoDocumento + '">' + this.TipoDocumento + '</option>';
            //listString += '<a class="dropdown-item" href="#" onclick="SetTextRito(\'' + this.idTipoUtilizador + '\');">' + this.TipoUtilizador + '</a>';
            //console.log('<a class="dropdown-item" href="#" onclick="SetTextRito("' + this.Rito + '");">' + this.Rito + '</a>');
        });
        //appending to the div
        $('#cmbTipoDocumento').html(listString);
    }

    function errorFunc() {
        alert('error');
    }



}

function GetProcessos(idempresa, idutilizador, idtipoutilizador) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetProcessosUtilizador',
        data: "{'idEmpresa':'" + idempresa + "','idUtilizador':'" + idutilizador + "','idTipoUtilizador':'" + idtipoutilizador + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {

        var lankanListArray = JSON.parse(data.d);
        // creating html string
        var listString = '<option value="-1"></option>';
        // running a loop
        $.each(lankanListArray, function (index, value) {
            listString += '<option value="' + this.idProcesso + '">' + this.NProcesso + '</option>';
            //listString += '<a class="dropdown-item" href="#" onclick="SetTextRito(\'' + this.idTipoUtilizador + '\');">' + this.TipoUtilizador + '</a>';
            //console.log('<a class="dropdown-item" href="#" onclick="SetTextRito("' + this.Rito + '");">' + this.Rito + '</a>');
        });
        //appending to the div
        $('#cmbProcessoDocumento').html(listString);
    }

    function errorFunc() {
        alert('error');
    }



}

function GetClientes(idempresa, idutilizador, idtipoutilizador) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetClientesUtilizador',
        data: "{'idEmpresa':'" + idempresa + "','idUtilizador':'" + idutilizador + "','idTipoUtilizador':'" + idtipoutilizador + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {

        var lankanListArray = JSON.parse(data.d);
        // creating html string
        var listString = '<option value="-1"></option>';
        // running a loop
        $.each(lankanListArray, function (index, value) {
            listString += '<option value="' + this.idCliente + '">' + this.Nome + '</option>';
            //listString += '<a class="dropdown-item" href="#" onclick="SetTextRito(\'' + this.idTipoUtilizador + '\');">' + this.TipoUtilizador + '</a>';
            //console.log('<a class="dropdown-item" href="#" onclick="SetTextRito("' + this.Rito + '");">' + this.Rito + '</a>');
        });
        //appending to the div
        $('#cmbClienteDocumento').html(listString);
    }

    function errorFunc() {
        alert('error');
    }



}

function Verifica(idtipodocumento) {
    var res = true;
    console.log('[VERIFICA] idtipodocumento : ' + idtipodocumento)
    if (idtipodocumento === '-1') {
        //alert('É necessário introduzir um tipo de documento.');
        res = false;
    }
    return res;
}
