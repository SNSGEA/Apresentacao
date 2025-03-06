function GetFolhaDeslocacao(idFolhaDeslocacao) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetFolhaDeslocacao',
        data: "{'idFolhaDeslocacao':'" + idFolhaDeslocacao + "'}",
        async: false,
        success: function (response) {
            var items = response.d;
            $('#txtidFolhaDeslocacao').val(items.idFolhaDeslocacao);
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
            $('#cmbTipoFolhaDeslocacao').val(items.idTipoFolhaDeslocacao);
            $("#fotoFolhaDeslocacao").prop("src", '../img/FolhaDeslocacaoes/' + items.idFolhaDeslocacao + '.jpg');


        },
        error: function (response) {
            alert("Ocorreu um erro ao editar dados da FolhaDeslocacao." + response.responseText);
        }
    });
}



