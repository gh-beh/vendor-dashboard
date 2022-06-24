export interface Vendor {
    username: string,
    name: string,
    email: string,
    phoneNo: string,
    icNo: string,
    address: string,
    permitStartDate: string,
    permitEndDate: string,
}

export const NULL_VENDOR: Vendor = {
    username: '',
    name: '',
    email: '',
    phoneNo: '',
    icNo: '',
    address: '',
    permitStartDate: '',
    permitEndDate: '',
};

export const MOCK_VENDOR: Vendor = {
    username: 'vendor',
    name: 'SBC External Vendor',
    email: 'vendor@sbc.com',
    phoneNo: '+60198237645',
    icNo: '761023-08-4589',
    address: '13 Jalan 22/6, Shah Alam, Selangor, Malaysia',
    permitStartDate: '2015/06/01',
    permitEndDate: '2025/06/01',
};
