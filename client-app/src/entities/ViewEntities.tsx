import { Product, Profile, Professional } from "./DBEntities";

export interface ProductToSale {
    product: Product;
    profile: Profile;
    professional: Professional;
}