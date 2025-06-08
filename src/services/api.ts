import { Planet, ApiPlanetResponse } from '@/types';

const planetImageMap: Record<string, string> = {
  Mercury: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter07_centered.jpg/600px-Mercury_in_color_-_Prockter07_centered.jpg",
  Venus: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/600px-Venus-real_color.jpg",
  Earth: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg",
  Mars: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg",
  Jupiter: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
  Saturn: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg",
  Uranus: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg",
  Neptune: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Neptune.jpg/600px-Neptune.jpg",
  Pluto: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/600px-Pluto_in_True_Color_-_High-Res.jpg"
};


const API_BASE_URL = "https://api.le-systeme-solaire.net/rest/bodies";

export async function getPlanets(): Promise<Planet[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/?filter[]=isPlanet,eq,true&data=id,name,englishName,isPlanet,mass,density,gravity,meanRadius,moons,bodyType,avgTemp,discoveredBy,discoveryDate,axialTilt,sideralOrbit,sideralRotation,imageUrl`);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data: ApiPlanetResponse = await response.json();
    return data.bodies.map(planet => ({
      ...planet,
      imageUrl: planetImageMap[planet.englishName] || '/placeholder-planet.jpg'
    }));
  } catch (error) {
    console.error("Failed to fetch planets:", error);
    return [];
  }
}

export async function getPlanetById(id: string): Promise<Planet | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}?data=id,name,englishName,isPlanet,mass,density,gravity,meanRadius,moons,bodyType,avgTemp,discoveredBy,discoveryDate,axialTilt,sideralOrbit,sideralRotation,semimajorAxis,perihelion,aphelion,eccentricity,inclination,vol,escape,equaRadius,polarRadius,flattening,dimension,aroundPlanet,alternativeName,rel,imageUrl`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const planetData: Planet = await response.json();
    return {
      ...planetData,
      imageUrl: planetImageMap[planetData.englishName] || '/placeholder-planet.png'
    };
  } catch (error) {
    console.error(`Failed to fetch planet ${id}:`, error);
    return null;
  }
}