import { Professional, Address, Contact } from "./IEntities"

export function ParseProfessional(data: any): Professional {    
    return {
        id: (data as Professional).id || 0,
        name: (data as Professional).name || '',
        lastName: (data as Professional).lastName || '',
        img: (data as Professional).img || '',
        contactId: (data as Professional).contactId || 0,
        addressId: (data as Professional).addressId || 0,
        dateBirth: (data as Professional).dateBirth || '',
        isAddressShowed: (data as Professional).isAddressShowed ? true : false || false,
        address: {
            city: (data as Address).city || '',
            complement: (data as Address).complement || '',
            district: (data as Address).district || '',
            id: (data as Address).id || 0,
            num: (data as Address).num || '',
            state: (data as Address).state || '',
            street: (data as Address).street || '',
            zipCod: (data as Address).zipCod || 0
        },
        contact: {
            eMail: (data as Contact).eMail || '',
            phone: (data as Contact).phone || '',
            id: (data as Contact).id || 0
        }
    }
}