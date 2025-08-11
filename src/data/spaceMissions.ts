// Space Missions Dataset (1957-2022)
export interface SpaceMission {
  id: string;
  name: string;
  date: string;
  country: string;
  agency: string;
  status: 'Success' | 'Failure' | 'Partial Failure';
  cost: number; // in millions USD
  crew: number;
  purpose: string;
  rocket: string;
  launchSite: string;
  duration?: number; // in days
  description: string;
}

export const spaceMissionsData: SpaceMission[] = [
  {
    id: "1",
    name: "Sputnik 1",
    date: "1957-10-04",
    country: "Soviet Union",
    agency: "Soviet Space Program",
    status: "Success",
    cost: 5,
    crew: 0,
    purpose: "Earth Observation",
    rocket: "R-7 Semyorka",
    launchSite: "Baikonur Cosmodrome",
    duration: 92,
    description: "First artificial satellite to orbit Earth"
  },
  {
    id: "2",
    name: "Explorer 1",
    date: "1958-01-31",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 8,
    crew: 0,
    purpose: "Scientific Research",
    rocket: "Juno I",
    launchSite: "Cape Canaveral",
    duration: 111,
    description: "First US satellite, discovered Van Allen radiation belts"
  },
  {
    id: "3",
    name: "Luna 2",
    date: "1959-09-12",
    country: "Soviet Union",
    agency: "Soviet Space Program",
    status: "Success",
    cost: 12,
    crew: 0,
    purpose: "Lunar Exploration",
    rocket: "Luna 8K72",
    launchSite: "Baikonur Cosmodrome",
    description: "First human-made object to reach the Moon"
  },
  {
    id: "4",
    name: "Vostok 1",
    date: "1961-04-12",
    country: "Soviet Union",
    agency: "Soviet Space Program",
    status: "Success",
    cost: 25,
    crew: 1,
    purpose: "Human Spaceflight",
    rocket: "Vostok-K",
    launchSite: "Baikonur Cosmodrome",
    duration: 1,
    description: "First human spaceflight with Yuri Gagarin"
  },
  {
    id: "5",
    name: "Mercury-Redstone 3",
    date: "1961-05-05",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 20,
    crew: 1,
    purpose: "Human Spaceflight",
    rocket: "Mercury-Redstone",
    launchSite: "Cape Canaveral",
    description: "First US human spaceflight with Alan Shepard"
  },
  {
    id: "6",
    name: "Apollo 11",
    date: "1969-07-16",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 355,
    crew: 3,
    purpose: "Lunar Landing",
    rocket: "Saturn V",
    launchSite: "Kennedy Space Center",
    duration: 8,
    description: "First crewed lunar landing mission"
  },
  {
    id: "7",
    name: "Salyut 1",
    date: "1971-04-19",
    country: "Soviet Union",
    agency: "Soviet Space Program",
    status: "Partial Failure",
    cost: 45,
    crew: 0,
    purpose: "Space Station",
    rocket: "Proton-K",
    launchSite: "Baikonur Cosmodrome",
    duration: 175,
    description: "First space station, crew mission failed"
  },
  {
    id: "8",
    name: "Viking 1",
    date: "1975-08-20",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 935,
    crew: 0,
    purpose: "Mars Exploration",
    rocket: "Titan IIIE",
    launchSite: "Cape Canaveral",
    duration: 2307,
    description: "First successful US Mars lander"
  },
  {
    id: "9",
    name: "Voyager 1",
    date: "1977-09-05",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 865,
    crew: 0,
    purpose: "Deep Space Exploration",
    rocket: "Titan IIIE",
    launchSite: "Cape Canaveral",
    description: "Interstellar space probe, still active"
  },
  {
    id: "10",
    name: "STS-1",
    date: "1981-04-12",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 450,
    crew: 2,
    purpose: "Space Shuttle Test",
    rocket: "Space Shuttle Columbia",
    launchSite: "Kennedy Space Center",
    duration: 2,
    description: "First Space Shuttle mission"
  },
  {
    id: "11",
    name: "Mir",
    date: "1986-02-19",
    country: "Soviet Union",
    agency: "Soviet Space Program",
    status: "Success",
    cost: 4200,
    crew: 0,
    purpose: "Space Station",
    rocket: "Proton-K",
    launchSite: "Baikonur Cosmodrome",
    duration: 5511,
    description: "Long-duration orbital station"
  },
  {
    id: "12",
    name: "Hubble Space Telescope",
    date: "1990-04-24",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 2500,
    crew: 0,
    purpose: "Space Telescope",
    rocket: "Space Shuttle Discovery",
    launchSite: "Kennedy Space Center",
    description: "Revolutionary space telescope, still operational"
  },
  {
    id: "13",
    name: "Mars Pathfinder",
    date: "1996-12-04",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 280,
    crew: 0,
    purpose: "Mars Exploration",
    rocket: "Delta II",
    launchSite: "Cape Canaveral",
    duration: 85,
    description: "First Mars rover mission (Sojourner)"
  },
  {
    id: "14",
    name: "ISS Zarya",
    date: "1998-11-20",
    country: "Russia",
    agency: "Roscosmos",
    status: "Success",
    cost: 150000,
    crew: 0,
    purpose: "Space Station",
    rocket: "Proton-K",
    launchSite: "Baikonur Cosmodrome",
    description: "First module of International Space Station"
  },
  {
    id: "15",
    name: "Mars Exploration Rover A",
    date: "2003-06-10",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 820,
    crew: 0,
    purpose: "Mars Exploration",
    rocket: "Delta II",
    launchSite: "Cape Canaveral",
    duration: 2269,
    description: "Spirit rover, exceeded planned mission duration"
  },
  {
    id: "16",
    name: "SpaceX Falcon 1 Flight 4",
    date: "2008-09-28",
    country: "United States",
    agency: "SpaceX",
    status: "Success",
    cost: 7,
    crew: 0,
    purpose: "Commercial Launch",
    rocket: "Falcon 1",
    launchSite: "Kwajalein Atoll",
    description: "First privately funded liquid-fueled rocket to reach orbit"
  },
  {
    id: "17",
    name: "Kepler Space Telescope",
    date: "2009-03-07",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 600,
    crew: 0,
    purpose: "Exoplanet Discovery",
    rocket: "Delta II",
    launchSite: "Cape Canaveral",
    duration: 3463,
    description: "Discovered thousands of exoplanets"
  },
  {
    id: "18",
    name: "Curiosity Rover",
    date: "2011-11-26",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 2500,
    crew: 0,
    purpose: "Mars Exploration",
    rocket: "Atlas V",
    launchSite: "Cape Canaveral",
    description: "Nuclear-powered Mars rover, still active"
  },
  {
    id: "19",
    name: "SpaceX Dragon Demo-2",
    date: "2020-05-30",
    country: "United States",
    agency: "SpaceX",
    status: "Success",
    cost: 55,
    crew: 2,
    purpose: "Commercial Crew",
    rocket: "Falcon 9",
    launchSite: "Kennedy Space Center",
    duration: 64,
    description: "First crewed commercial spaceflight to ISS"
  },
  {
    id: "20",
    name: "Perseverance Rover",
    date: "2020-07-30",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 2700,
    crew: 0,
    purpose: "Mars Exploration",
    rocket: "Atlas V",
    launchSite: "Cape Canaveral",
    description: "Advanced Mars rover with helicopter companion"
  },
  {
    id: "21",
    name: "James Webb Space Telescope",
    date: "2021-12-25",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 10000,
    crew: 0,
    purpose: "Space Telescope",
    rocket: "Ariane 5",
    launchSite: "Kourou",
    description: "Most powerful space telescope ever built"
  },
  {
    id: "22",
    name: "Artemis 1",
    date: "2022-11-16",
    country: "United States",
    agency: "NASA",
    status: "Success",
    cost: 4100,
    crew: 0,
    purpose: "Lunar Exploration",
    rocket: "Space Launch System",
    launchSite: "Kennedy Space Center",
    duration: 25,
    description: "Uncrewed test flight for lunar return program"
  }
];

export const getUniqueCountries = () => {
  return Array.from(new Set(spaceMissionsData.map(mission => mission.country)));
};

export const getUniqueAgencies = () => {
  return Array.from(new Set(spaceMissionsData.map(mission => mission.agency)));
};

export const getUniquePurposes = () => {
  return Array.from(new Set(spaceMissionsData.map(mission => mission.purpose)));
};

export const getMissionsByDateRange = (startDate: string, endDate: string) => {
  return spaceMissionsData.filter(mission => 
    mission.date >= startDate && mission.date <= endDate
  );
};

export const getMissionsByStatus = (status: string) => {
  return spaceMissionsData.filter(mission => mission.status === status);
};

export const getMissionsByCountry = (country: string) => {
  return spaceMissionsData.filter(mission => mission.country === country);
};