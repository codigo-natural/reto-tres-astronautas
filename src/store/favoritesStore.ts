import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoriteState {
  favoritePlanetIds: string[];
  isFavorite: (planetId: string) => boolean;
  toggleFavorite: (planetId: string) => void;
}

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoritePlanetIds: [],
      isFavorite: (planetId) => get().favoritePlanetIds.includes(planetId),
      toggleFavorite: (planetId) =>
        set((state) => {
          const isCurrentlyFavorite = state.favoritePlanetIds.includes(planetId);
          if (isCurrentlyFavorite) {
            return { favoritePlanetIds: state.favoritePlanetIds.filter(id => id !== planetId) };
          } else {
            return { favoritePlanetIds: [...state.favoritePlanetIds, planetId] };
          }
        }),
    }),
    {
      name: 'planet-favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);