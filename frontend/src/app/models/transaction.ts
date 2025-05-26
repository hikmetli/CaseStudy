export type Transaction = {
    id: number
    userId: number
    description: string
    amount: number
    date: Date
    categoryId: number
}

export type TransactionUpdateModel = {
    id: number
    description: string
    amount: number
    date: Date
    categoryId: number
}

export type TransactionParams = {
    orderby: string,
    searchTerm: string,
    categories: string[],
    dateFrom: string,
    dateTo: string

}