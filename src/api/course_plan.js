const host = import.meta.env.VITE_API_URL;


export async function createCoursePlan(course_id, teacher_id, start_datetime, end_datetime) {
    const coursePlan = {
        course_id,
        teacher_id,
        start_datetime,
        end_datetime
    }
    const response = await fetch(`${host}/course_plans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coursePlan),
    })
    const data = await response.json();
    return data;
}