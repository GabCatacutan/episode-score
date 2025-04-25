const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_READ_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const getShowDetails = async (showId: string) => {
  const url = `${BASE_URL}/tv/${showId}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getShowNumberOfSeasons:", err);
    throw err;
  }
};

export const getSeasonDetails = async (showId: string, seasonNum: number) => {
  const url = `${BASE_URL}/tv/${showId}/season/${seasonNum}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.episodes;
  } catch (err) {
    console.error("Error in getSeasonDetails:", err);
    throw err;
  }
};

export const getShowList = async (showName: string) => {
  const url = `${BASE_URL}/search/tv?query=${encodeURIComponent(
    showName
  )}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getShowList:", err);
    throw err;
  }
};
