export interface EntitiId {
    id?: number;
}

export interface Address extends EntitiId{
    postalCode: string;
    street: string;
    num: string;
    complement: string;
    district: string;
    city: string;
    state: string;
}

export declare const Address: {
    prototype: Address;
    new(): Address;
}

export interface Contact extends EntitiId{
    phone: string;
    eMail: string;
}

export declare const Contact: {
    prototype: Contact;
    new(): Contact;
}

export interface Customer extends EntitiId{
    name: string;
    lastName: string;
    dateBirth: Date;
    img: string;
    cpf: string;
    address: Address;
    addressId: number;
    contact: Contact;
    contactId: number;
}

export declare const Customer: {
    prototype: Customer;
    new(): Customer;
}

export interface Professional extends Customer{
    cnpj: string;
    isAddressShowed: boolean;
    address: Address;
    addressId: number;
    contact: Contact;
    contactId: number;
    customerId: number;
}

export declare const Professional: {
    prototype: Professional;
    new(): Professional;
}

export interface Commerce extends EntitiId{
    name: string;
    img: string;
    address: Address;
    addressId: number;
    contact: Contact;
    contactId: number;
}

export declare const Commerce: {
    prototype: Commerce;
    new(): Commerce;
}

export interface Profile extends EntitiId{
    professional: Professional;
    professionalId: number;
    commerce: Commerce;
    commerceId: number;
}

export declare const Profile: {
    prototype: Profile;
    new(): Profile;
}

export interface User extends EntitiId{
    userName: string;
    password: string;
    profile: Profile;
    profileId: number;
    actived: boolean;
}

export declare const User: {
    prototype: User;
    new(): User;
}

export interface Local extends EntitiId{
    name: string;
    description: string;
    address: Address;
    addressId: number;
    commerce: Commerce;
    commerceId: number;
}

export declare const Local: {
    prototype: Local;
    new(): Local;
}

export interface ProductType extends EntitiId{
    name: string;
    description: string;
}

export declare const ProductType: {
    prototype: ProductType;
    new(): ProductType;
}

export interface Product extends EntitiId{
    code: string;
    name: string;
    description: string;
    img: string;
    readMore: string;
    tagLink: string;
    registerDate: Date;
    productType: ProductType;
    productTypeId: number;
    profileId: number;
    payments?: Array<Payment>;
    productInfos?: Array<ProductInfo>;
}

export declare const Product: {
    prototype: Product;
    new(): Product;
}

export interface ProductInfo extends EntitiId{
    productId: number;
    title: string;
    description: string;
    img: string;
}

export declare const ProductInfo: {
    prototype: ProductInfo;
    new(): Product;
}

export interface Payment extends EntitiId {
    name: string;
    description: string;
    img: string;
    value: number;
    productId: number;
}

export declare const Payment: {
    prototype: Payment;
    new(): Payment;
}

export interface Cart extends EntitiId {
    info: string;
    status: string;
    listIdItens: string;
    createReg: Date;
    customerId: number;
}

export declare const Cart: {
    prototype: Cart;
    new(): Cart;
}

export interface Order extends EntitiId {
    id: number;
    paymentMethod: string;
    customerId: number;
    cartId: number;
    subTotal: number;
    status: string;
}

export declare const Order: {
    prototype: Order;
    new(): Order;
}

export interface OrderItem extends EntitiId {
    id: number;
    checkoutId: number;
    paymentId: number;
    productId: number;
    customerId: number;
    isRecurrence: boolean;
    quantity: number;
}

export declare const OrderItem: {
    prototype: OrderItem;
    new(): OrderItem;
}
