export interface GetSubscriptionsResponse {
    data: Webhook[];
    total: number;
    total_cost: number;
    max_total_cost: number;
    pagination: unknown;
}

export interface Webhook {
    id: string;
    status: string;
    type: string;
    version: string;
    cost: number;
    condition: Condition;
    created_at: string;
    transport: Transport;
}

export interface Transport {
    method: string;
    callback: string;
}

export interface Condition {
    broadcaster_user_id?: string;
    user_id?: string;
}
