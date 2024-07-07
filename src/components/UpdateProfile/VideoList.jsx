

const VideoList = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <div key={video._id} className="border rounded-lg overflow-hidden shadow-lg flex">
          <img src={video.thumbnailSrc} alt={video.title} className="w-40 h-40 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
            <p className="text-gray-700 mb-4">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
