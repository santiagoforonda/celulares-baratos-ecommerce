
import type { Json } from "../supabase/supabase";

export interface Color{
    name:string;
    color:string;
    price:number;
}


export interface Product{
    id:string;
    name:string;
    brand:string;
    slug:string;
    features: string[];
    description:Json;
    images:string[];
    created_at:string;
    variants:Variant[];
}

export interface Variant{
    id:string;
    stock:number;
    price:number;
    storage:string;
    color:string;
    color_name:string;
}

export interface PreparedProducts{
    id:string;
    name:string;
    brand:string;
    slug:string;
    features: string[];
    description:Json;
    images:string[];
    created_at:string;
    price:number;
    colors:Color[];
    variants:Variant[];
}

export interface Color{
    name:string;
    color:string;
}