import {Broker} from "../../interfaces/broker.interface";

const API_URL = 'http://localhost:5000/api/brokers/'

export const getBrokersFetch = async () => {
    const response = await fetch(API_URL + 'get/all');

    if (!response.ok) {
        throw new Error('Failed to fetch brokers');
    }

    return await response.json();
};

export const deleteBrokerFetch = async (id: string) => {
    const response = await fetch(API_URL + `delete/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete broker');
    }
};

export const updateBrokerFetch = async (updatedBroker: Broker) => {
    const id = updatedBroker.userId;
    const response = await fetch(API_URL + `put/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBroker)
    });

    if (!response.ok) {
        throw new Error('Failed to update broker');
    }
};

export const addBrokerFetch = async (newBroker: Broker) => {
    const response = await fetch(API_URL + 'post/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBroker)
    });

    if(!response.ok) {
        throw new Error('Failed to add Broker');
    }

    return await response.json();
}