import {useEffect, useState} from "react";

// Hook
import {useFetch} from "./useFetch";

// Store
import {BalooStore} from "../store";

export function useData() {
    const {response, error, loading, fetchData} = useFetch('http://192.168.4.1/data');
    const [data, setData] = useState<BalooStore | null>(null);

    useEffect(() => {
        response && setData(response);
    }, [response])

    return {data, error, loading, fetchData};
}
