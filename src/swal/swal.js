import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
    message(titulo = "", texto, tipoIcone = "success", color = "success") {
        Swal.fire({
            position: "center",
            icon: tipoIcone,
            title: titulo,
            text: texto,
            showConfirmButton: true,
            confirmButtonColor: color,
        });
    },
    messageToast(titulo = "", tipoIcone = "success", position = "top-end") {
        Swal.fire({
            toast: true,
            title: titulo,
            icon: tipoIcone,
            position: position,
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });
    },
    async messageNotificacao() {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
                popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
        });
        await Toast.fire({
            icon: "info",
            title: "Nova Solicitação de Autorização.",
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });
    },

    messageComBtnsDeConfimacao(
        title,
        text = "",
        icon = "success",
        confirmButtonText = "Sim",
        cancelButtonText = "Não",
        denyButtonText = "",
        showDenyButton = false
    ) {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            showDenyButton: showDenyButton,
            confirmButtonColor: "primary",
            denyButtonColor: "secondary",
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            denyButtonText: denyButtonText,
        });
    },

    deleteMessage(title = "Tem certeza que deseja apagar", nameToExclude) {
        return Swal.fire({
                    title: `${title} <b>${`${nameToExclude}`}</b>?`,
      text: "Esta ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    });
  },
};

// Swal.message("testou", "teste com sucesso");