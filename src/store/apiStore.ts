/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchApiData,
  fetchApiData2,
  updateApiData,
} from "@/services/apiService";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ApiState = {
  data: null | any;
  loading: boolean;
  error: string | null;
  message?: string | null;
};

type ApiStore = {
  apis: Record<string, ApiState>;
  fetchApi: (key: string, url: string) => Promise<void>;
  postApiData: (key: string, url: string, body?: any) => Promise<void>;
  updateApi: (key: string, url: string, body?: any) => Promise<void>;
  resetApi: (key: string) => void;
  resetAllApis: () => void;
};

const autoClearMiddleware = (config) => (set, get, api) => {
  const enhancedSet = (args) => {
    const result = set(args);

    // Automatically reset data for the specific API after fetch or post
    if (args.apis) {
      Object.keys(args.apis).forEach((key) => {
        if (args.apis[key]?.data !== null) {
          setTimeout(() => {
            set((state) => ({
              apis: {
                ...state.apis,
                [key]: {
                  data: null,
                  loading: false,
                  error: null,
                  message: null,
                },
              },
            }));
          }, 5000); // Clear the API data after 5 seconds
        }
      });
    }

    return result;
  };

  return config(enhancedSet, get, api);
};

const useApiStore = create<ApiStore>()(
  persist(
    autoClearMiddleware((set, get) => ({
      languageId: null,

      apis: {},

      setLanguageId: (id: string) => {
        set({ languageId: id });
      },

      fetchApi: async (key, url) => {
        set((state) => ({
          apis: {
            ...state.apis,
            [key]: { data: null, loading: true, error: null },
          },
        }));

        const { data, error } = await fetchApiData(url);

        set((state) => ({
          apis: {
            ...state.apis,
            [key]: { data: data?.data, loading: false, error },
          },
        }));
      },

      postApiData: async (key, url, body) => {
        set((state) => ({
          apis: {
            ...state.apis,
            [key]: { data: null, loading: true, error: null, message: null },
          },
        }));
        const { data, error } = await fetchApiData2(url, body);

        set((state) => ({
          apis: {
            ...state.apis,
            [key]: {
              data: data,
              loading: false,
              error,
              message: data?.message,
            },
          },
        }));
      },

      updateApi: async (key, url, body) => {
        set((state) => ({
          apis: {
            ...state.apis,
            [key]: { data: null, loading: true, error: null, message: null },
          },
        }));
        const { data, error } = await updateApiData(url, body);

        set((state) => ({
          apis: {
            ...state.apis,
            [key]: {
              data: data,
              loading: false,
              error,
              message: data?.message,
            },
          },
        }));
      },

      resetApi: (key) => {
        set((state) => ({
          apis: {
            ...state.apis,
            [key]: { data: null, loading: false, error: null },
          },
        }));
      },

      resetAllApis: () => {
        set({ apis: {} });
      },
    })),
    {
      name: "api-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        languageId: state.languageId,
      }),
    }
  )
);

export default useApiStore;
