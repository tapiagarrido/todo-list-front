import axiosInstance from "../libs/axiosInit";

export const getTareas = async (page=1, limit=10) => {
    try {
        const response = await axiosInstance.get('/tareas',{
            params:{
                page, limit
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTarea = async (id) => {

    try {
        const response = await axiosInstance.get(`/tareas/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteTarea = async (id) => {
    try {
        const response = await axiosInstance.delete(`/tareas/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const guardarTarea = async (data) => {
    try {
        const response = await axiosInstance.post('tareas', {
            ...data
        })
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const modificarTarea = async (data) => {

    try {
        const response = await axiosInstance.put(`/tareas/${data.id}`,{
            ...data
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}