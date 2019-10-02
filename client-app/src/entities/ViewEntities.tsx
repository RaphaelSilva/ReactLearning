import { Product, Perfil, Professional } from "./DBEntities";

export interface ProductToSale {
    product: Product;
    perfil: Perfil;
    professional: Professional;
}