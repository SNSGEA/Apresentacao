function GetCliente(idCliente) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetCliente',
        data: "{'idCliente':'" + idCliente + "'}",
        async: false,
        success: function (response) {
            var items = response.d;
            $('#txtidCliente').val(items.idCliente);
            $('#txtidEmpresa').val(items.idEmpresa);
            $('#txtCodigo').val(items.Codigo);
            $('#txtNome').val(items.Nome);
            $('#txtMorada').val(items.Morada);
            $('#txtNCelula').val(items.NCelula);
            $('#txtEmail').val(items.Email);
            $('#txtNif').val(items.Nif);
            $('#txtTelefone').val(items.Telefone);
            $("#txtTelemovel").val(items.Telemovel);
            $('#txtPassword').val(items.Password);
            $('#cmbTipoCliente').val(items.idTipoCliente);
            $("#fotoCliente").prop("src", '../img/clientes/' + items.idCliente + '.jpg');


        },
        error: function (response) {
            alert("Ocorreu um erro ao editar dados da Cliente." + response.responseText);
        }
    });
}

function GetTiposCliente() {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetTiposCliente',
        data: "{}",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {

        var lankanListArray = JSON.parse(data.d);
        // creating html string
        var listString = '';
        // running a loop
        $.each(lankanListArray, function (index, value) {
            listString += '<option value="' + this.idTipoCliente + '">' + this.TipoCliente + '</option>';

            //listString += '<a class="dropdown-item" href="#" onclick="SetTextRito(\'' + this.idTipoCliente + '\');">' + this.TipoCliente + '</a>';
            //console.log('<a class="dropdown-item" href="#" onclick="SetTextRito("' + this.Rito + '");">' + this.Rito + '</a>');
        });
        //appending to the div
        $('#cmbTipoCliente').html(listString);

    }

    function errorFunc() {
        alert('error');
    }



}

function SaveFotoCliente(file) {

    // console.log('EstandarteUploader.ashx?idLoja=' + idloja);
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
        type: 'post',
        url: 'FotoClienteUploader.ashx?idCliente=' + $('#txtidCliente').val() + '_' + $('#txtidEmpresa').val(),
        data: formData,
        success: function (status) {
            if (status != 'error') {
                d = new Date();
                var timestamp = d.getTime();
                //$("#myimg").attr("src", "/myimg.jpg?" + d.getTime());                    
                console.log('Save Foto: OK -> ' + "../img/clientes/" + $('#txtidCliente').val() + '_' + $('#txtidEmpresa').val() + ".jpg" + '?' + timestamp);
                $("#fotoCliente").attr("src", "../img/clientes/" + $('#txtidCliente').val() + '_' + $('#txtidEmpresa').val() + ".jpg" + '?' + timestamp);
                //location.reload();
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            console.log('Save Foto: NOK');
        }
    });

}
