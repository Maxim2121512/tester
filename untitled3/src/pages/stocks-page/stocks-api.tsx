
const API_URL = 'http://localhost:5000/api/stocks/'

export const getStocksFetch = async () => {
    const response = await fetch(API_URL + 'get/summary');

    if (!response.ok) {
        throw new Error('Failed to get stocks');
    }

    return await response.json();

}

export const getHistoricalFetch = async (label: string | undefined) => {
    if (label === undefined) {
        throw new Error('Failed to get historical: label undefined')
    }

    const response = await fetch(API_URL + `get/${label}`);

    if (!response.ok) {
        throw new Error('Failed to get historical');
    }

    const stockHistorical = await response.json();

    return stockHistorical.data;
}

