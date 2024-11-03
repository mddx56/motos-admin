export type ResponseApi<T> = {
    success: boolean;
    data:    T[];
    message: string;
}