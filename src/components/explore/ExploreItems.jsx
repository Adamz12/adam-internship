import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Timer from "../UI/Timer";
import AOS from "aos";
import "aos/dist/aos.css";

const ExploreItems = () => {
  const [explore, setExplore] = useState([]);
  const [numItemsToShow, setNumItemsToShow] = useState(8);
  const [loading, setLoading] = useState(true);

  async function getExploreItems(likes_high_to_low) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${likes_high_to_low}`
    );
    setExplore(data);
  }

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  useEffect(() => {
    getExploreItems("");
  }, [loading]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  function loadmore() {
    setNumItemsToShow((prevNumItems) => prevNumItems + 4);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => getExploreItems(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {explore.slice(0, numItemsToShow).map((user) => (
        <div
          key={user.id}
          data-aos="fade-in"
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${user.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                {loading ? (
                  <Skeleton className="items-circle__skeleton" />
                ) : (
                  <img className="lazy" src={user.authorImage} alt="" />
                )}
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {loading ? (
              <Skeleton className="skeleton__de_countdown" />
            ) : (
              <div className="de_countdown">
                <Timer expiryTimestamp={user.expiryDate} />
              </div>
            )}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${user.nftId}`}>
                {loading ? (
                  <Skeleton className="img__skeleton" />
                ) : (
                  <img
                    src={user.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                )}
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                {loading ? (
                  <Skeleton className="user-title__skeleton" />
                ) : (
                  <h4>{user.title}</h4>
                )}
              </Link>
              {loading ? (
                <Skeleton />
              ) : (
                <div className="nft__item_price">{user.price}</div>
              )}
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{user.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        {numItemsToShow < explore.length && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadmore}
          >
            Load More
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
