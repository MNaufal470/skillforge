import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
type userProps = {
  id?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
};

type user = {
  user: userProps;
  setUser: (state: userProps) => void;
};

const userStore: StateCreator<user> = (set) => ({
  user: {},
  setUser: (user: userProps) => set((state) => ({ user: user })),
});

export const useUserStore = create(
  persist(userStore, {
    name: "user-store",
  })
);
