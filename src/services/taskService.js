const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAll = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
      } catch (error) {
        console.error('Error en obtener las tareas:', error);
      }
}

export const get = async (id) => {
    try {

        const response = await fetch(API_URL+id);
        if (!response) {
            return await response.json({message: `No hay tarea con ID: ${id}`})
        } else
        return await response.json()
    } catch (error) {
        console.error('Error en obtener la tarea: ', id, error);
    }
}

export const create = async (task) => {
    try {
        const response = await fetch(API_URL, {
            body: JSON.stringify(task),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json()
    } catch (error) {
        console.error('Error al crear la tarea: ', id, error);
    }
}

export const update = async (id, task) => {
    try {
        const response = await fetch(API_URL+id, 
            {body: JSON.stringify(task), method: 'PUT',
            headers: {
            'Content-Type': 'application/json'}});
        return await response.json()
    } catch (error) {
        console.error('Error al actualizar la tarea: ', id, error);
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await fetch(API_URL+id, {method: 'DELETE'});
        return await response.json()
    } catch (error) {
        console.error('Error al eliminar la tarea: ', id, error);
    }
}



