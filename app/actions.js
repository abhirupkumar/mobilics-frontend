"use server";

export const handleSubmit = async (FormData, userData) => {
    let data = {}
    if (FormData.get('name'))
        data.name = FormData.get('name')
    if (FormData.get('email'))
        data.email = FormData.get('email')
    if (FormData.get('phone'))
        data.phone = FormData.get('phone')
    if (FormData.get('desc'))
        data.desc = FormData.get('desc')
    if (FormData.get('skills'))
        data.skills = FormData.get('skills')
    if (FormData.get('certifications'))
        data.certifications = FormData.get('certifications')
    if (FormData.get('experience'))
        data.experience = FormData.get('experience')
    if (FormData.get('education'))
        data.education = FormData.get('education')

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/update/${userData._id}`, {
        method: 'PUT', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    return res.json();
}

export const handleSubmit2 = async (FormData, userData) => {
    let data = FormData;

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/update/${userData._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    return res.json();
}