export interface Bus {
    id: number,
    busPlateNo: string,
    busType: string,
    capacity: number,
};

export const MOCK_BUSES: Bus[] = [
    {
        id: 1,
        busPlateNo: 'JJL9831',
        busType: 'Coach',
        capacity: 15,
    },
    {
        id: 2,
        busPlateNo: 'VHS0123',
        busType: 'MPV',
        capacity: 7,
    },
    {
        id: 3,
        busPlateNo: 'BUS1337',
        busType: 'Mini Bus',
        capacity: 20,
    },
];
