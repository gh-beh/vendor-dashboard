import {Trip} from './trip';

export interface Booking {
    id: number,
    customerContactNo: string,
    passengerCount: number,
    busType: string,
    status: number,
    remark: string,
    trips: Trip[],
    busId: number,
    busNo: string,
    driverId: number,
    driverName: string,
}

export const NULL_BOOKING: Booking = {
    id: -1,
    customerContactNo: '',
    passengerCount: -1,
    busType: '',
    status: -1,
    remark: '',
    trips: [],
    busId: -1,
    busNo: '',
    driverId: -1,
    driverName: '',
};

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: 5,
        customerContactNo: '+60142271134',
        passengerCount: 13,
        busType: 'Coach',
        status: 0,
        remark: 'Require Wheelchair',
        trips: [
            {
                start: 'KLIA',
                end: 'Melaka',
                startDate: new Date(2022, 10, 20, 10, 0, 0),
            },
            {
                start: 'Melaka',
                end: 'Senai Airport',
                startDate: new Date(2022, 10, 28, 18, 0, 0),
            },
        ],
        busId: 0,
        busNo: '',
        driverId: 0,
        driverName: '',
    },
    {
        id: 6,
        customerContactNo: '+60122461915',
        passengerCount: 6,
        busType: 'MPV',
        status: 0,
        remark: '-',
        trips: [
            {
                start: 'Shah Alam',
                end: 'Subang',
                startDate: new Date(2022, 9, 11, 7, 0, 0),
            },
            {
                start: 'Shah Alam',
                end: 'Subang',
                startDate: new Date(2022, 9, 12, 7, 0, 0),
            },
            {
                start: 'Shah Alam',
                end: 'Subang',
                startDate: new Date(2022, 9, 13, 7, 0, 0),
            },
        ],
        busId: 0,
        busNo: '',
        driverId: 0,
        driverName: '',
    },
];
