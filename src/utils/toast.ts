import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

export const toast = {
  success: (message: string) =>
    Toast.fire({
      icon: "success",
      title: message,
    }),

  error: (message: string) =>
    Toast.fire({
      icon: "error",
      title: message,
    }),

  info: (message: string) =>
    Toast.fire({
      icon: "info",
      title: message,
    }),

  warning: (message: string) =>
    Toast.fire({
      icon: "warning",
      title: message,
    }),
};