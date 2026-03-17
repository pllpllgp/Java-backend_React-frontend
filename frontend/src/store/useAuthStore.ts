import {create} from "zustand";
import {persist} from "zustand/middleware";

interface User {
    id: string;
    name: string,
    nick: string;
}

interface AuthState {
    user: User | null;
    token: String | null;
    isLoggedIn: boolean;
    login: (userData: User, token: String) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>() (
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoggedIn: false,

            login: (userData, token) => set({user: userData, token, isLoggedIn: true}),

            logout: () => set({user: null, token: null, isLoggedIn: false}),
        }),
    {
            name: 'userInfo'
        }
    )
)