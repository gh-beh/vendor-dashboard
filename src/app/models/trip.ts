export interface Trip {
    start: string,
    end: string,
    startDate: Date,
};

export const NULL_TRIP: Trip = {
    start: '',
    end: '',
    startDate: new Date(),
};
