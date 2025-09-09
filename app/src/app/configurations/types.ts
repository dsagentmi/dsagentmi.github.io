'use client'
export interface ICode {
    name: string;
    definition?: string;
    category: string;
    dimension: string;
    key: string;
    color_name: string;
}
export interface ICategory {
    name: string;
    id: string;
    codes: ICode[];
    definition?: string;
    dimension: string;
    key: string;
    color_name: string;
}

export interface IDimension {
    name: string;
    color_name: string;
    categories: ICategory[];
    definition?: string;
}
export interface Ifilter{
    dim:string;
    cat:string;
    code:string;
}