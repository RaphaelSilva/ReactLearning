import { Product, Profile, Professional } from './Entities'

export interface ProductAndType {
    id: number;
    name: string;
    description: string;
    img: string;
    readMore: string;
    tagLink: string;
    registerDate: Date;
    productTypeId: number;
    profileId: number;
    typeId: number;
    typeName: string;
    typeDescription: string;
}

export interface ProductToSale {
    product: Product;
    profile: Profile;
    professional: Professional;
}

export interface ResponseView {
    message: string;
    variant: 'success'|'warning'|'error'|'info';
}
