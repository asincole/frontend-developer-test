export interface Payment {
    id: string;
    amount: { value: string; currency: string; };
    date: string;
    merchant: string;
    receipts: Array<{ url: string }>;
    comment: string;
    category: string;
    user: { first: string; last: string; email: string; };
    index: number;
}

export interface PaymentResponse {
    payments: Payment[];
    total: number;
}
