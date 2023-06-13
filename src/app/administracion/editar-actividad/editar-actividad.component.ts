import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActvidadComplementariaClase } from 'src/app/interfaces/act-complementaria.interface';
import { EvdComprobatoriaClase } from 'src/app/interfaces/evd-comprobatoria.interface';
import { EvdPresentarClase } from 'src/app/interfaces/evd-presentar.interface';
import { EvdComprobatoria } from 'src/app/models/evd-comprobatoria.model';
import { EvdPresentar } from 'src/app/models/evd-presentar.model';
import { TiposAct } from 'src/app/models/tipos-act.model';
import { ActividadComplementariaService } from 'src/app/services/actividad-complementaria.service';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent implements OnInit {
  id: any;
  TiposActs: TiposAct[] = [];

  actComplementaria = new ActvidadComplementariaClase();

  EvdsPresentar: EvdPresentar[] = [];
  EvdsPresentar2: EvdPresentar[] = [];
  datosFiltrados: EvdPresentar[] = [];
  evdPre = new EvdPresentarClase();
  EvdsComproba: EvdComprobatoria[] = [];
  evdComproba = new EvdComprobatoriaClase();
  //formulario//
  formulario: any;
  formulario2: any;
  //validaciones en los inputs
  isValidSubmit: boolean = true;//validacion padre
  isValidSubmit2: boolean = false;//validacion padre

  constructor(private router: Router,
    private ar: ActivatedRoute, 
    private evdPreService: ActividadComplementariaService,
    private tipoActService: TipoActividadService
  ) { }
  ngOnInit(): void {
    this.id = this.ar.snapshot.paramMap.get('id');
    this.formularioReactivo();
    // this.formularioReactivo2();
    if (this.id != null) {
      //entro en gestion del abono
      this.mostrarValores();
    }
    
    this.obtenerTiposActividades();
    // this.resultadosEvdPresentar();
    // this.obtenerEvdComprobatorias();
  }
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      act_gnral: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      act_especifica: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      credito: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      lugar: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      num_participantes: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      tiempo: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      descripcion: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      tipo: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  formularioReactivo2(): void {
    this.formulario2 = new FormGroup({
      descripcion: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  obtenerTiposActividades() {
    this.tipoActService.getTipoActividades().subscribe((res: any) => {
      this.TiposActs = res.data;
      // console.log(this.TiposActs);
      // console.log(res);

    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerEvdsPresentar() {
    this.evdPreService.getEvdsPresentar().subscribe((res: any) => {
      this.EvdsPresentar = res.data;
     // this.EvdsPresentar2
     // const elemento = this.EvdsPresentar.indexOf(evdPre);
     // this.EvdsPresentar.splice(elemento, 1);
     //console.log(this.EvdsPresentar);
    this.resultadosEvdPresentar()
    }, ((error: any) => {
      console.log(error);
    }));
  }
  resultadosEvdPresentar(){
    // console.log(this.EvdsComproba);
    if (this.EvdsComproba.length>0){
    for (let i = 0; i < this.EvdsComproba.length; i++) {
      console.log("[" + this.EvdsComproba[i].evd_presentar + "]----[" + this.EvdsComproba[i].evd_pres_des + "]");
      this.evdPre.id = this.EvdsComproba[i].evd_presentar;
      this.evdPre.descripcion = this.EvdsComproba[i].evd_pres_des;

      this.EvdsPresentar2.push(this.evdPre);
      // const elemento = this.EvdsPresentar.indexOf(this.evdPre);
      // this.EvdsPresentar.splice(elemento, 1);
      this.evdPre = new EvdPresentarClase();
      // console.log(this.evdPre);
    }
    // console.log(this.EvdsPresentar2);
    // Arreglo con Ids a filtrar
    const idsNoPermitidos = this.EvdsPresentar2.map(doc => doc.id);
    // Sólo aceptar aquellos que ID no esté en el arreglo de idsNoPermitidos
    this.datosFiltrados = this.EvdsPresentar.filter(doc => !idsNoPermitidos.includes(doc.id))
  }else{
      this.datosFiltrados = this.EvdsPresentar;
  }
    // console.log(this.datosFiltrados);
  }
  obtenerEvdComprobatorias(evdComprobatorias: any) {
    this.evdPreService.getEvdComprobatorias(evdComprobatorias.id).subscribe((res: any) => {
      this.EvdsComproba = res.data;
      // this.EvdsPresentar2 = this.EvdsComproba;
      
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerEvdPresentar(evdPre: any) {
    this.evdPreService.getEvdPresentar(evdPre.id).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.evdPre = res.data;
        // console.log(this.evdPre);
        this.formulario2.controls['descripcion'].setValue(this.evdPre.descripcion);
      }
    );
  }
  mostrarValores() {
    this.evdPreService.getActComplementaria(this.id).subscribe((res: any) => {
      this.actComplementaria = res.data;
      // console.log(this.actComplementaria);
      this.obtenerEvdComprobatorias(this.actComplementaria);
      this.obtenerEvdsPresentar();
      this.presentandoDatos();
      
      // this.resultadosEvdPresentar()
      
      // console.log(res);

    }, ((error: any) => {
      console.log(error);
      let mensajeErrorConEtiquetas = error.error.messages.error;
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    }));
  }
  presentandoDatos() {
    this.formulario.patchValue({
      act_gnral: this.actComplementaria['act_gnral'],
      act_especifica: this.actComplementaria['act_especifica'],
      credito: this.actComplementaria['credito'],
      lugar: this.actComplementaria['lugar'],
      num_participantes: this.actComplementaria['num_participantes'],
      tiempo: this.actComplementaria['tiempo'],
      descripcion: this.actComplementaria['descripcion'],
      tipo: this.actComplementaria['tipo']
    });

  }
  editarEvdPresentar() {
    this.evdPre.descripcion = this.formulario2.value.descripcion;
    console.log(this.evdPre);
    this.evdPreService.putEvdPresentar(this.evdPre).subscribe(
      res => {
        console.log(res);
        this.openToast();
      },
      err => {
        console.log('no se pudo actualizar');
      }
    );
  }
  
  editarActComplementaria() {
    this.actComplementaria.act_especifica = this.formulario.value.act_especifica;
    this.actComplementaria.act_gnral = this.formulario.value.act_gnral;
    this.actComplementaria.tipo = this.formulario.value.tipo;
    this.actComplementaria.credito = this.formulario.value.credito;
    this.actComplementaria.lugar = this.formulario.value.lugar;
    this.actComplementaria.num_participantes = this.formulario.value.num_participantes;
    this.actComplementaria.tiempo = this.formulario.value.tiempo;
    this.actComplementaria.descripcion = this.formulario.value.descripcion;

    this.evdPreService.putActComplementaria(this.actComplementaria).subscribe((res: any) => {
      // console.log(res.data);
      this.actComplementaria.id = res.data.id;
      // this.jdpto = res.data;
      // console.log(this.actComplementaria);
      this.openToast2();
    }, (err: any) => {
      console.log(err);
      let mensajeErrorConEtiquetas = err.error.messages.error;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }

  agregarElemento(evdPre: any) {
    this.evdComproba.act_complementaria = this.actComplementaria.id;
    this.evdComproba.evd_presentar = evdPre.id;

    this.evdPreService.postEvdComprobatoria(this.evdComproba).subscribe((res: any) => {
      // console.log(res.data);
      this.evdComproba.id = res.data.id;
      console.log(this.evdComproba);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Guardado correctamente.',
      }).then((result) => {
        // this.EvdsPresentar2.push(evdPre);
        const elemento = this.datosFiltrados.indexOf(evdPre);
        this.datosFiltrados.splice(elemento, 1);
        this.obtenerEvdComprobatorias(this.actComplementaria);
        // console.log(this.EvdsPresentar2);
      });

      // this.EvdsPresentar2.push(evdPre);
      // const elemento = this.EvdsPresentar.indexOf(evdPre);
      // console.log(elemento);
      // this.EvdsPresentar.splice(elemento, 1);
      // console.log(this.EvdsPresentar2);
    }, (err: any) => {
      console.log(err);
      let mensajeErrorConEtiquetas = err.error.messages.error;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });

  }
  eliminarElemento(evd2: any) {
    this.evdPreService.getEvdPresentar(evd2.evd_presentar).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.evdPre = res.data;
        //console.log(this.evdPre);
      }
    );
    // console.log(this.evdPre);
    // this.evdComproba.evd_presentar = evdPre.id; 
    Swal.fire({
      position: 'top',
      width: '40%',
      padding: '0.75rem',
      title: 'Estas seguro de Eliminar!',
      text: 'No se podra recuperar la informacion.',
      icon: 'warning',
      footer: '<span class="rojo">Esta informacion es importante</span>',
      backdrop: 'true',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#DC143C",
      confirmButtonColor: "rgb(0, 0, 139)",
    }).then((result) => {
      if (result.value) {

        // const elemento = this.EvdsPresentar2.indexOf(evd2);
        // this.EvdsPresentar2.splice(elemento, 1);
        // this.EvdsPresentar = this.EvdsPresentar2.filter((item) => item.descripcion === evd2.descripcion)
        // const elemento = this.EvdsPresentar2.filter(item=> item.descripcion === evd2.descripcion);
        // console.log(this.EvdsPresentar2);
        this.evdPreService.deleteEvdComprobatoria(evd2.id).subscribe((res: any) => {
          console.log(res.data);
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Borrado exitosamente!',
            position: 'top-right',
            iconColor: 'white',
            color: 'white',
            background: '#3fc3ee',
            showConfirmButton: false,
            timer: 1250,
            timerProgressBar: true,
          }).then((result) => {
            this.datosFiltrados.push(this.evdPre);
            this.obtenerEvdComprobatorias(this.actComplementaria);
            // console.log(evd2);
            // console.log(this.evdComproba);

          });

        }, (err: any) => {
          console.log(err);
          let mensajeErrorConEtiquetas = err.error.messages.error;
          console.log(mensajeErrorConEtiquetas);
          let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
          this.mensajeError(mensajeError);
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          toast: true,
          icon: 'info',
          title: 'Cancelado',
          position: 'top-right',
          iconColor: 'white',
          color: 'white',
          background: '#f27474',
  
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true,
        })
      }
    })
  }

  // mensajes y alertas como eventos de respuesta sobre los subscribe
  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/administracion/crud-actividad']);
      }
    })
  }
  openToast() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
    }).then((result) => {
      // location.reload()
      // this.obtenerEvdsPresentar(),
      this.limpiarControls()
    });
  }
  openToast2() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
    }).then((result) => {
      this.isValidSubmit2 = true;
      this.isValidSubmit = false;
      this.desabilitarInput();
    });
  }
  limpiarControls(): void {
    this.formulario2.controls['descripcion'].setValue('');
  }
  desabilitarInput() {
    this.formulario.disable();
  }
}
