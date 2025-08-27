export interface PaymentReceipt {
    id:       string;
    document: Document;
    number:   number;
    name:     string;
    date:     Date;
    type:     string;
    supplier: Supplier;
    items:    Item[];
    metadata: Metadata;
    payment?: Payment;
}

export interface Document {
    id: number;
}

export interface Item {
    account?:     Account;
    description?: string;
    value:        number;
    due?:         Due;
}

export interface Account {
    code:     string;
    movement: string;
}

export interface Due {
    prefix:      string;
    consecutive: number;
    quote:       number;
    date:        Date;
}

export interface Metadata {
    created: Date;
}

export interface Payment {
    id:    number;
    name:  string;
    value: number;
}

export interface Supplier {
    id:             string;
    identification: string;
    branch_office:  number;
}