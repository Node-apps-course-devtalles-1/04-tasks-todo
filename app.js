// const { inquirerMenu } = require('./helpers/inquirer')

import {
  confirmDeleteTask,
  inquirerMenu,
  leerInput,
  listTasksToDelete,
  pause,
  showListCheckList
} from './helpers/inquirer.js'

import 'colors'
import { Tareas } from './models/tareas.js'
import { leerDB, saveData } from './helpers/guardarArchivo.js'
// const { mostrarMenu, pause } = require('./helpers/mensajes')

const main = async () => {
  let opt = ''

  const tareas = new Tareas()

  const tareasDB = leerDB()

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }
  // await pause()
  do {
    opt = await inquirerMenu()
    console.log({ opt })

    switch (opt) {
      case '1':
        // crear tarea
        const desc = await leerInput('Description :')
        tareas.crearTarea(desc)
        break
      case '2':
        tareas.listadoCompleto()
        break

      case '3':
        tareas.listarPendientesCompletadas()
        break

      case '4':
        tareas.listarPendientesCompletadas(false)
        break

      case '5':
        const ids = await showListCheckList(tareas.listadoArr)
        tareas.toggleCompletTask(ids)
        break

      case '6':
        const id = await listTasksToDelete(tareas.listadoArr)
        if (id !== '0') {
          const okDeleteTask = await confirmDeleteTask(
            'Are you sure to delete task'
          )
          console.log({ okDeleteTask })
          if (okDeleteTask) {
            tareas.borrarTarea(id)
            console.log('Task has been deleted !!')
          }
        }

        break
      default:
        // listarPendientesCompletadas
        break
    }

    saveData(tareas.listadoArr)
    // const tareas = new Tareas()
    // const tarea = new Tarea('Comprar comida')

    // console.log(tareas)

    if (opt !== '0') await pause()
  } while (opt !== '0')
}

main()
