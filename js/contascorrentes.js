function GetContaCorrente(idContaCorrente) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetContaCorrente',
        data: "{'idContaCorrente':'" + idContaCorrente + "'}",
        async: false,
        success: function (response) {
            var items = response.d;
            $('#txtidContaCorrente').val(items.idContaCorrente);
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
            $('#cmbTipoContaCorrente').val(items.idTipoContaCorrente);
            $("#fotoContaCorrente").prop("src", '../img/ContaCorrentees/' + items.idContaCorrente + '.jpg');


        },
        error: function (response) {
            alert("Ocorreu um erro ao editar dados da ContaCorrente." + response.responseText);
        }
    });
}
