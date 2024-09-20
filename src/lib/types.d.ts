

export type ProductType = {
    category: string;
    createdAt: number;
    description: string;
    name: string;
    price: number;
    prodId: string;
    prodImage: string;
    updatedAt: number;
}
export interface CartItem {
    category: string;
    createdAt: number;
    description: string;
    name: string;
    price: number;
    prodId: string;
    prodImage: string;
    quantity: number;
    updatedAt: number;
}

export interface ShoppingCart {
    subscribe: (run: (value: CartItem[]) => void) => () => void;
    addItem: (item: CartItem) => void;
    removeItem: (name: string) => void;
    updateQuantity: (name: string, quantity: number) => void;
    clearCart: () => void;
    getCartCount: () => number;
}
