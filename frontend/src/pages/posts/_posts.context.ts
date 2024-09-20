import { create } from "zustand";

export interface IPost {
  changed: Boolean;
  text: Object;
  originalText: Object;
}

export interface IPostsProps {
  postsState: IPost[];
  setPostsState: (data: IPost[]) => void;
}
export const usePostsStore = create<IPostsProps>((set) => ({
  postsState: [],
  setPostsState: (data: IPost[]) => set({ postsState: data }),
}));
