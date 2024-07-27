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

export function useUserCertificates(user_id) {
    const { data, error, isLoading } = useSWR(`${host}/certificates/${user_id}`, fetcher)

    return {
        certificates: data,
        isLoading,
        isError: error,
    }
}

export async function createCourseCertificate(user_id, course_plan_id,course_id) {
    if (!user_id || !course_plan_id || !course_id) return;

    const courseCertificate = {
        user_id,
        course_plan_id,
        course_id
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