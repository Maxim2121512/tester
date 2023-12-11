import {Settings} from "./settings.interface";

const API_URL = 'http://localhost:5000/api/settings/'

export const setSettings = async (settings: Settings) => {
    const response = await fetch(API_URL + 'put/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
    })

    if (!response.ok) {
        throw new Error('Failed to set settings');
    }

    return await response.json();
}

export const getSettings = async () => {
    const response = await fetch(API_URL + 'get/');

    if (!response.ok) {
        throw new Error('Failed to fetch brokers');
    }
    console.log("resp:", response.json());
    return await response.json();
}