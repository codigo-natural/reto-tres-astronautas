export interface Mass {
  massValue: number;
  massExponent: number;
}

export interface Volume {
  volValue: number;
  volExponent: number;
}

export interface Moon {
  moon: string;
  rel: string;
}

export interface Planet {
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  moons: Moon[] | null;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclination: number;
  mass?: Mass;
  vol?: Volume;
  density: number;
  gravity: number;
  escape: number;
  meanRadius: number;
  equaRadius: number;
  polarRadius: number;
  flattening: number;
  dimenseion: string;
  sideralOrbit: number;
  sideralRotation: number;
  aroundPlanet: {
    planet: string;
    rel: string;
  } | null;
  discoveredBy: string;
  discoveryDate: string;
  alternativeName: string;
  axialTilt: number;
  avgTemp: number;
  mainAnomaly: number;
  argPeriapsis: number;
  longAscNode: number;
  bodyType: string;
  rel: string;
  diameter: number;

  imageUrl?: string;
}

export interface ApiPlanetResponse {
  bodies: Planet[]
}