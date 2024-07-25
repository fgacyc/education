const host = import.meta.env.VITE_API_URL;


export async function create_enrollment(user_id, courses_plan_id){
    const enrollment = {
        user_id,
        courses_plan_id
    }

    const response = await fetch(`${host}/enrollments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollment),
    })

    const data = await response.json();
    return data;
}