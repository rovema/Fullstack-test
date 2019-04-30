document.addEventListener("turbolinks:load", function () {
    $(document).ready(function () {

    });
});

function removebookcase(id) {

    $.ajax({
        method: "get",
        url: '/consult_book/' + id,
    }).done(function (result) {
        console.log(result)
        if (result.books == false) {
            remover(id)
        } else {
            swal({
                title: 'Voce tem certeza?',
                text: "Existe livros vinculados a esta estante",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        console.log(willDelete)
                        if (willDelete == true) {
                            $.ajax({
                                method: "get",
                                url: '/bookcase/removed/' + id,
                            }).done(function (result) {
                                swal("Livros e estantes deletados", {
                                    icon: "success",
                                });
                                location.reload();
                            });
                        }
                    } else {
                        swal("Não realizado..");
                    }
                });
        }
    });
}

function remover(id) {
    $.ajax({
        method: "get",
        url: '/bookcase/removed/' + id,
    }).done(function (result) {
        location.reload();
    });
}