
import { useSelector } from "react-redux";
import useVideoTrailer from "../hooks/useVideoTrailer";

const VideoPlayBack = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies.videoTrailer)

 useVideoTrailer(movieId);

  return (
    <div className="">
      <iframe
        className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1"}
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default VideoPlayBack;
