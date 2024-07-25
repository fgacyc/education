import useSWR from "swr";
import {fetcher} from "@/tools.js";

const host = import.meta.env.VITE_API_URL;

export function useCourseCertificate(course_plan_id,user_id) {
    const { data, error, isLoading } = useSWR(`${host}/certificates/${course_plan_id}/${user_id}`, fetcher)

    return {
        courseCertificate: data,
        isLoading,
        isError: error,
    }
}

export async function createCourseCertificate(user_id, course_plan_id) {
    const courseCertificate = {
        user_id,
        course_plan_id
    }
    const response = await fetch(`${host}/certificates`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseCertificate),
    })
    const data = await response.json();
    return data;
}