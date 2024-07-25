import useSWR from "swr";
import {fetcher} from "@/tools.js";
const host = import.meta.env.VITE_API_URL;

export function useCourses() {
    const { data, error, isLoading } = useSWR(`${host}/courses`, fetcher)

    return {
        courses: data,
        isLoading,
        isError: error,
    }
}
