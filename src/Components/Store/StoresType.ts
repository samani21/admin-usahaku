export interface ProductType {
    name: string;
    price: number;
    discount: number;
    image: string
}
export interface StoresType {
    id: number;
    name: string;
    category: string;
    distance: string;
    address: string;
    lat: number;
    lng: number;
    status: string;
    products: ProductType[];
    image: string;
}

export interface StoriesType {
    id: number;
    storeName: string;
    avatar: string;
    seen: boolean;
}


export interface PostType {
    id: number;
    storeName: string;
    image: string;
    caption: string;
    time: string;
    likes: string;
    comments: string;
    category: string;
    isPremium: boolean;
}

export interface UserLocationType {
    lat: number;
    lng: number;
}