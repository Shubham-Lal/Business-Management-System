import { create } from "zustand";

export interface Customer {
    _id: string
    name: string
    phone: string
    email: string
    address?: string
}

interface CustomerState {
    customers: Customer[]
    setCustomers: (customersData: Customer[] | []) => void
}

const useCustomerStore = create<CustomerState>((set) => ({
    customers: [],
    setCustomers: (customersData) => set({ customers: customersData })
}));

export default useCustomerStore;