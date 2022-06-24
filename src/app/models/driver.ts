export interface Driver {
    id: number,
    name: string,
    busPlateNo: string,
    phoneNo: string,
    icNo: string,
    licenseNo: string,
    licenseClass: string,
};

export const MOCK_DRIVERS: Driver[] = [
    {
        id: 1,
        name: 'Wong Chee Keat',
        busPlateNo: 'JJL9831',
        phoneNo: '+60123456789',
        icNo: '870123-04-5679',
        licenseNo: '29085503',
        licenseClass: 'E2',
    },
    {
        id: 2,
        name: '',
        busPlateNo: 'VHS0123',
        phoneNo: '+60189339753',
        icNo: '740625-10-3892',
        licenseNo: '29358727',
        licenseClass: 'E2',
    },
];
