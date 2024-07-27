const host = import.meta.env.VITE_API_URL;


export async function createReport(uid, course_id) {
    if (!uid || !course_id) return;
    const report = {
        user_id: uid,
        course_id
    }

    const response = await fetch(`${host}/reports`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
    })

    const data = await response.json();
    return data;
}