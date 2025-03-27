import { Link, useParams } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import "./RelatedVideos.css";
import { useEffect, useState } from "react";
import moment from "moment";

const RelatedVideos = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`}>
            <div key={index} className="related-item">
              <div>
                <img src={item.snippet.thumbnails.medium.url} alt="" />
              </div>
              <div>
                <h2>{item.snippet.title}</h2>
                <span>{item.snippet.channelTitle}</span>
                <div>
                  <span>
                    {value_converter(item.statistics.viewCount)} views
                  </span>
                  <span>{moment(item.snippet.publishedAt).fromNow()}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default RelatedVideos;
