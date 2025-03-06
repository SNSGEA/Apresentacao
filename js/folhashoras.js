function GetFolhaHoras(idFolhaHoras) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetFolhaHoras',
        data: "{'idFolhaHoras':'" + idFolhaHoras + "'}",
        async: false,
        success: function (response) {
            var items = response.d;
            $('#txtidFolhaHoras').val(items.idFolhaHoras);
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
            $('#cmbTipoFolhaHoras').val(items.idTipoFolhaHoras);
            $("#fotoFolhaHoras").prop("src", '../img/FolhaHorases/' + items.idFolhaHoras + '.jpg');


        },
        error: function (response) {
            alert("Ocorreu um erro ao editar dados da FolhaHoras." + response.responseText);
        }
    });
}



