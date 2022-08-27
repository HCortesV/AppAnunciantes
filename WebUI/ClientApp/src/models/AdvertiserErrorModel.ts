
export interface AdvertiserErrorModel {
    errors: AdvertiserParameterErrorModel
}

export interface AdvertiserParameterErrorModel {
    Rut: string[],
    Name: string[],
    Phone: string[]
}

export interface AdvertiserErrorResponse {
    _error:string,
    rut?: string,
    name?: string,
    phone?: string
}