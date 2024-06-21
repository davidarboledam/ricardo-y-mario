
import React from 'react';
import { useState } from 'react';
import axios from "axios";

/*useFetch: Es un hook personalizado que se utiliza para manejar la lógica de obtención de datos desde una API. */

const useFetch = () => {
/* apiData: Estado para almacenar los datos obtenidos de la API. */
    const [apiData, setApiData] = useState();

/*isLoading: Estado para indicar si la solicitud está en curso.*/
    const [isLoading, setIsLoading] = useState()

/*hasError: Estado para indicar si hubo un error en la solicitud. */
    const [hasError, setHasError] = useState();

    const getApi = url => {
        setIsLoading(true)
        axios.get(url)
            .then(res => {
                setHasError(false);
                setApiData(res.data);
            })
            .catch(err => {
                setHasError(true)
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    }
    return [apiData, getApi, isLoading, hasError];
}

export default useFetch;