import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SwalIcon } from '../class/accordion-constant.class';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  environment = environment;
  private BACKGROUND_COLOR: string = 'rgba(56, 62, 66, 1)';
  private BACKDROP_COLOR: string = 'rgba(0, 0, 0, 0.5)';
  private TEXT_COLOR: string = '#FFFFFF';

  toastMessage(icon: any, message: string) {
    const Toast = Swal.mixin({
      customClass: {
        popup: 'border_round',
      },
      toast: true,
      position: 'top-end',
      color: this.TEXT_COLOR,
      background: this.BACKGROUND_COLOR,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: icon,
      title: message,
    });
  }

  confirmDialog(
    title: string,
    text: string,
    confirmButtonText: string,
    denyButtonText: string
  ): any {
    const customClassSwal = Swal.mixin({
      customClass: {
        confirmButton: 'rounded-pill',
        denyButton: 'rounded-pill',
        popup: 'border_round',
      },
      buttonsStyling: true,
    });
    return customClassSwal.fire({
      icon: SwalIcon.QUESTION,
      title: title,
      text: text,
      color: this.TEXT_COLOR,
      background: this.BACKGROUND_COLOR,
      backdrop: this.BACKDROP_COLOR,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: confirmButtonText,
      denyButtonText: denyButtonText,
    });
  }

  simpleDialog(icon: any, title: string, text: string) {
    const customClassSwal = Swal.mixin({
      customClass: {
        confirmButton: 'rounded-pill',
        popup: 'border_round',
      },
      buttonsStyling: true,
    });
    customClassSwal.fire({
      icon: icon,
      title: title,
      text: text,
      color: this.TEXT_COLOR,
      background: this.BACKGROUND_COLOR,
      backdrop: this.BACKDROP_COLOR,
    });
  }
}
