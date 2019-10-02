export interface EntitiId {
    id?: number;
}

export interface Address extends EntitiId{
    zipCod: number;
    street: string;
    num: string;
    complement: string;
    district: string;
    city: string;
    state: string;
}

export interface Contact extends EntitiId{
    phone: string;
    eMail: string;
}

export interface Professional extends EntitiId{
    name: string;
    lastName: string;
    dateBirth: Date;
    img: string;
    isAddressShowed: boolean;
    address: Address;
    addressId: number;
    contact: Contact;
    contactId: number;
}

export interface Commerce extends EntitiId{
    name: string;
    img: string;
    address: Address;
    addressId: number;
    contact: Contact;
    contactId: number;
}

export interface Perfil extends EntitiId{
    professional: Professional;
    professionalId: number;
    commerce: Commerce;
    commerceId: number;
}

export interface User extends EntitiId{
    userName: string;
    password: string;
    perfil: Perfil;
    perfilId: number;
    actived: boolean;
}

export interface Local extends EntitiId{
    name: string;
    description: string;
    address: Address;
    addressId: number;
    commerce: Commerce;
    commerceId: number;
}

export interface ProductType extends EntitiId{
    name: string;
    description: string;
}

export interface Product extends EntitiId{
    name: string;
    description: string;
    value: number;
    tagLink: string;
    registerDate: Date;
    productTypeId: number;
    perfilId: number;
}
