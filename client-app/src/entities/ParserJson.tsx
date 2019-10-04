import { Professional, Address, Contact, Profile, Commerce, Product } from "./DBEntities"

export function ParseAddress(data?: any): Address {
    return {
        city: data ? (data as Address).city || '' : '',
        complement: data ? (data as Address).complement || '' : '',
        district: data ? (data as Address).district || '' : '',
        id: data ? (data as Address).id || 0 : 0,
        num: data ? (data as Address).num || '' : '',
        state: data ? (data as Address).state || '' : '',
        street: data ? (data as Address).street || '' : '',
        postalCode: data ? (data as Address).postalCode || '' : ''
    }
}

export function ParseContact(data?: any): Contact {
    return {
        eMail: data ? (data as Contact).eMail || '' : '',
        phone: data ? (data as Contact).phone || '' : '',
        id: data ? (data as Contact).id || 0 : 0
    }
}

export function ParseProfessional(data?: any): Professional {
    return {
        id: data ? (data as Professional).id || 0 : 0,
        name: data ? (data as Professional).name || '' : '',
        lastName: data ? (data as Professional).lastName || '' : '',
        img: data ? (data as Professional).img || '' : '',
        contactId: data ? (data as Professional).contactId || 0 : 0,
        addressId: data ? (data as Professional).addressId || 0 : 0,
        dateBirth: data ? (data as Professional).dateBirth || '' : new Date(),
        isAddressShowed: data ? (data as Professional).isAddressShowed ? true : false || false : false,
        address: ParseAddress(data),
        contact: ParseContact(data)
    }
}

export function ParseCommerce(data?: any): Commerce {
    return {
        name: data ? (data as Commerce).name || '' : '',
        img: data ? (data as Commerce).img || '' : '',
        address: data ? (data as Commerce).address || ParseAddress(data) : ParseAddress(),
        addressId: data ? (data as Commerce).addressId || 0 : 0,
        contact: data ? (data as Commerce).contact || ParseContact(data) : ParseContact(),
        contactId: data ? (data as Commerce).contactId || 0 : 0
    }
}

export function ParseProfile(data?: any): Profile {
    return {
        professional: data ? (data as Profile).professional || ParseProfessional(data) : ParseProfessional(),
        professionalId: data ? (data as Profile).professionalId || 0 : 0,
        commerce: data ? (data as Profile).commerce || ParseCommerce(data) : ParseCommerce(),
        commerceId: data ? (data as Profile).commerceId || 0 : 0
    }
}

export function ParseProduct(data?: any): Product {
    return {
    name: data ? (data as Product).name || '' : '',
    description: data ? (data as Product).description || '' : '',
    value: data ? (data as Product).value || 0 : 0,
    tagLink: data ? (data as Product).tagLink || '' : '',
    registerDate: data ? (data as Product).registerDate || '' : new Date(),
    productTypeId: data ? (data as Product).productTypeId || 0 : 0,
    profileId: data ? (data as Product).profileId || 0 : 0
    }
}