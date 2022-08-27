
export interface AdvertiserState {
    isLoading: boolean;
    startDateIndex?: number;
    advertiservm?: AdvertiserVm;
    advertiser?: Advertiser;
    redirect: boolean,
    deleted:boolean
}

export interface AdvertiserVm {
    advertisers: Advertiser[]
}

export interface Advertiser {
    id: number;
    rut: string;
    name: string;
    description: string;
    phone: string;
    address: string;
    country: string;
}