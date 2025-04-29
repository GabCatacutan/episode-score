// app/show/[showId]/page.tsx
import EpisodeRating from "@/components/episodedetailshover";
import { getSeasonDetails, getShowDetails } from "@/services/tmdb/api";

type Props = {
  params: { showId: string };
};

const ShowPage = async ({ params }: Props) => {
  const { showId } = await params;

  // Fetch number of seasons for the show
  const seriesData = await getShowDetails(showId);

  const numOfSeasons = seriesData.number_of_seasons;

  // Fetch episode list from each season
  const episodeList = [];
  for (let i = 0; i < numOfSeasons; i++) {
    const episodes = await getSeasonDetails(showId, i + 1);
    episodeList.push({ season: i + 1, episodes });
  }

  console.log(episodeList[0])

  return (
    <div className="flex p-4">
      {/*Series Details Section */}
      <div>
        <h1 className="text-2xl font-bold">Show ID: {showId}</h1>
        <img
          className="h-80 w-64"
          src={`https://image.tmdb.org/t/p/w500${seriesData.poster_path}`}
        ></img>
        <h1>Number of seasons: {numOfSeasons}</h1>
      </div>

      {/*Episode List and Rating Section */}
      <div>
        <div className="flex mt-4">
          {episodeList.map((seasonData, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl p-4">Season {seasonData.season}</h2>
              <ul className="flex flex-col flex-wrap">
                {seasonData.episodes.map((episode: any, index: number) => (
                  <EpisodeRating episode={episode} index={index}></EpisodeRating>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
