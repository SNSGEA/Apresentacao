function GetProcesso(idProcesso) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetProcesso',
        data: "{'idProcesso1':'" + idProcesso + "'}",
        async: false,
        success: function (response) {
            var items = response.d;
            $('#txtidProcesso').val(items.idProcesso1);
            $('#txtidEmpresa').val(items.idEmpresa);
            $('#txtNProcesso').val(items.NProcesso);
            $('#dtAbertura').val(items.dtAbertura);
            $('#dtTribunal').val(items.dtTribunal);
            $('#dtEncerramento').val(items.dtEncerramento);
            //$('#txtEmail').val(items.Email);
            //$('#txtNif').val(items.Nif);
            //$('#txtTelefone').val(items.Telefone);
            //$("#txtTelemovel").val(items.Telemovel);
            //$('#txtPassword').val(items.Password);
            //$('#cmbTipoProcesso').val(items.idTipoProcesso);
            $("#fotoProcesso").prop("src", '../img/processos/' + items.idProcesso + '.jpg');


        },
        error: function (response) {
            alert("Ocorreu um erro ao editar dados da Processo." + response.responseText);
        }
    });
}

//NProcesso = "";
//idEmpresa = -1;
//Posicao = "";
//Judicial = "";
//Departamento = "";
//Tipo = "";
//Assunto = "";
//Valor = "";
//dtAbertura = DateTime.Now;
//dtTribunal = DateTime.Parse("2000-01-01");
//dtEncerramento = DateTime.Parse("2000-01-01");
//HMinimos = "";
//Activo = "";
//idProcesso1 = -1;
//NomeCliente = "";
//NomeAdvogado = "";
//idAdvogado = -1;
//EmailCliente = "";
//Saldo = 0;



function GetTiposProcesso() {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetTiposProcesso',
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
            listString += '<option value="' + this.idTipoProcesso + '">' + this.TipoProcesso + '</option>';

            //listString += '<a class="dropdown-item" href="#" onclick="SetTextRito(\'' + this.idTipoProcesso + '\');">' + this.TipoProcesso + '</a>';
            //console.log('<a class="dropdown-item" href="#" onclick="SetTextRito("' + this.Rito + '");">' + this.Rito + '</a>');
        });
        //appending to the div
        $('#cmbTipoProcesso').html(listString);

    }

    function errorFunc() {
        alert('error');
    }



}

function SaveFotoProcesso(file) {

    // console.log('EstandarteUploader.ashx?idLoja=' + idloja);
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
        type: 'post',
        url: 'FotoProcessoUploader.ashx?idProcesso=' + $('#txtidProcesso').val() + '_' + $('#txtidEmpresa').val(),
        data: formData,
        success: function (status) {
            if (status != 'error') {
                d = new Date();
                var timestamp = d.getTime();
                //$("#myimg").attr("src", "/myimg.jpg?" + d.getTime());                    
                console.log('Save Foto: OK -> ' + "../img/processos/" + $('#txtidProcesso').val() + '_' + $('#txtidEmpresa').val() + ".jpg" + '?' + timestamp);
                $("#fotoProcesso").attr("src", "../img/processos/" + $('#txtidProcesso').val() + '_' + $('#txtidEmpresa').val() + ".jpg" + '?' + timestamp);
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
