import { Tarea } from './tarea.js'

export class Tareas {
  _listado = {}

  get listadoArr() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  constructor() {
    this._listado = {}
  }

  cargarTareasFromArray = (tareas) => {
    // console.log({ tareas })
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  crearTarea(description = '') {
    const tarea = new Tarea(description)
    this._listado[tarea.id] = tarea
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  listadoCompleto() {
    this.printWithFormat(this.listadoArr)
  }

  listarPendientesCompletadas(completadas = true) {
    const tareas = this.listadoArr.filter((tarea) =>
      completadas ? tarea.completadoEn !== null : tarea.completadoEn === null
    )

    this.printWithFormat(tareas)
  }

  printWithFormat = (tareas) => {
    tareas.map((tarea, id) => {
      console.log(
        `${(id + 1).toString().green}${'.'.green} ${tarea.desc} :: ${
          tarea.completadoEn === null
            ? 'Pendiente'.red
            : tarea.completadoEn.green
        }`
      )
    })
  }

  toggleCompletTask(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}
