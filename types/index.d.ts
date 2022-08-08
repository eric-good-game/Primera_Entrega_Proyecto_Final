// Language: typescript
// Path: class_14/server/index.d.ts

export type FileBase = {
    nextId: number
};

// Products
export type Product = {
    id?: number;
    name: string;
    price: number;
    photoUrl: string;
    code:string,
    stock:number,
    description:string,
    timestamp?:number
};
// export type NewProductData = Omit<Product, 'id'>;

export interface ProductFile extends FileBase {
    data: Product[];
}

//Users
export type User = {
    id: number;
    email: string;
    isAdmin: boolean;
    currentCart: number;
};

export interface UserFile extends FileBase {
    data: User[];
}

// Carts
type cartItem = Product & {
    quantity: number;
};
export interface Cart{
    id: number;
    items: CartItem[];
    timestamp: number;
    totalItems: number;
};

export interface CartFile extends FileBase {
    data: Cart[];
}