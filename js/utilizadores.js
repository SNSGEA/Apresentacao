function GetUtilizador(idUtilizador) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetUtilizador',
        data: "{'idUtilizador':'" + idUtilizador + "'}",
        async: false,
        success: function (response) {
            var items = response.d;             
            $('#txtidUtilizador').val(items.idUtilizador);
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
            $('#cmbTipoUtilizador').val(items.idTipoUtilizador);           
            $("#fotoUtilizador").prop("src", '../img/UTIL/' + items.idUtilizador + '.jpg');
            
            
        },
        error: function (response) {
            alert("Ocorreu um erro ao editar dados da Utilizador." + response.responseText);
        }
    });
}

function GetTiposUtilizador() {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Dados.aspx/GetTiposUtilizador',
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
            listString += '<option value="'+this.idTipoUtilizador +'">'+this.TipoUtilizador+'</option>';

            //listString += '<a class="dropdown-item" href="#" onclick="SetTextRito(\'' + this.idTipoUtilizador + '\');">' + this.TipoUtilizador + '</a>';
            //console.log('<a class="dropdown-item" href="#" onclick="SetTextRito("' + this.Rito + '");">' + this.Rito + '</a>');
        });
        //appending to the div
        $('#cmbTipoUtilizador').html(listString);

    }

    function errorFunc() {
        alert('error');
    }



}

function SaveFotoUtilizador(file) {

    // console.log('EstandarteUploader.ashx?idLoja=' + idloja);
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
        type: 'post',
        url: 'FotoUtilizadorUploader.ashx?idUtilizador=' + $('#txtidUtilizador').val() +'_'+ $('#txtidEmpresa').val(),
        data: formData,
        success: function (status) {
            if (status != 'error') {
                d = new Date();
                var timestamp = d.getTime();
                //$("#myimg").attr("src", "/myimg.jpg?" + d.getTime());                    
                console.log('Save Foto: OK -> ' + "../img/UTIL/" + $('#txtidUtilizador').val() + '_' + $('#txtidEmpresa').val() + ".jpg" + '?' + timestamp);
                $("#fotoUtilizador").attr("src", "../img/UTIL/" + $('#txtidUtilizador').val()  + '_' + $('#txtidEmpresa').val() + ".jpg" + '?' + timestamp);
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

//function GetUtilizadoresPesquisaAvancada(idempresa) {

//    var idEmpresa = idempresa;
//    var txtNomeUtilizadorPesquisa = $('#txtNomeUtilizadorPesquisa').val();
//    var txtEmailUtilizadorPesquisa = $('#txtEmailUtilizadorPesquisa').val();
//    var txtNifUtilizadorPesquisa = $('#txtNifUtilizadorPesquisa').val();    
//    var txtTelemovelUtilizadorPesquisa = $('#txtTelemovelUtilizadorPesquisa').val();
     
//    for (var j = 0; j <150; j++) {       
//        $("#listaUtilizadores").remove();
//    }
       

//    var res1 = "{'idEmpresa':'" + idEmpresa + "','Nome':'" + txtNomeUtilizadorPesquisa + "','Email':'" + txtEmailUtilizadorPesquisa + "','Nif':'" + txtNifUtilizadorPesquisa + "','Telemovel':'" + txtTelemovelUtilizadorPesquisa + "'}";
//    console.log('Valores da janela de pesquisa avançada:' + res1);
//    $.ajax({
//        type: 'POST',
//        contentType: "application/json; charset=utf-8",
//        url: 'Dados.aspx/GetUtilizadoresPesquisaAvancadaLista',
//        data: "{'idEmpresa':'" + idEmpresa + "','Nome':'" + txtNomeUtilizadorPesquisa + "','Email':'" + txtEmailUtilizadorPesquisa + "','Nif':'" + txtNifUtilizadorPesquisa + "','Telemovel':'" + txtTelemovelUtilizadorPesquisa + "'}",
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: successFunc,
//        error: errorFunc
//    });
//    function successFunc(data, status) {        

//        $("#listaUtilizadores").data = data;
//        var listString = '';
//        //for (var i = 0; i <data.d.length; i++) {
//        //    //idUtilizador, idEmpresa, Utilizador, Codigo, Nome, Morada, Abreviatura, NCelula, Email, Nif, Telefone, Telemovel, Password, idTipoUtilizador, TipoUtilizador, Empresa, PesquisaRapida
//        //    listString += '<div class="contact-box"> <div class="col-sm-4"> <div class="text-center"> <img alt="image" class="img-circle m-t-xs img-responsive" width="128" height="128" src=\'../img/UTIL/' + data.d[i].idUtilizador + '.jpg\' onerror="this.onerror=null;this.src=\'../img/UTIL/default.jpg\'"; onclick="EditaUtilizador(' + data.d[i].idUtilizador + ');"> <div class="m-t-xs font-bold">' + data.d[i].TipoUtilizador + '</div> </div> </div> <div class="col-sm-8"> <h3><strong>' + data.d[i].Nome + '</strong></h3> <address> <p class="m-b-xs"> <ul class="list-unstyled m-t-md"> <li> <span class="fa fa-envelope m-r-xs"></span> <label>Email:</label>' + data.d[i].Email + '</li><li> <span class="fa fa-home m-r-xs"></span> <label>Morada:</label>' + data.d[i].Morada + '</li> <li> <span class="fa fa-phone m-r-xs"></span> <label>Contacto:</label>' + data.d[i].Telemovel + '</li></ul> <button type="button" class="btn btn-primary" onclick="EditaUtilizador(' + data.d[i].idUtilizador + ');">Editar</button></p></address></div> <div class="clearfix"></div> </div>';
//        //    console.log(listString);
//        //    $("#listaUtilizadores").append(listString);            
//        //    listString = '';
//        //}

//        $("#myModalPesquisaAvancada").modal('hide');

//        //$("#listaUtilizadores").html = listString;

//        //$("#listaUtilizadores").append("<tr><td>" + data.d[i].Nome + "  - " + data.d[i].TipoUtilizador + "</td></tr>");
//        //$('#listViewUtilizadores').val();
//        //console.log(listString);

//    }
//    //function successFunc(data, status) {
        
//    //    var lankanListArray = JSON.parse(data.d);
//    //    alert('sucesso' + lankanListArray);
//    //    $("#listViewUtilizadores").prop("datasource", lankanListArray);
//    //    $("#myModalPesquisaAvancada").modal('hide');
        
//    //    $("#listViewUtilizadores").listview("refresh");
       
//    //}

//    function errorFunc() {
//        alert('error');
//    }
//}
