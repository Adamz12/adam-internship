import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const Timer = ({ expiryTimestamp }) => {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
      const currentTime = new Date().getTime();
      const timeDifference = expiryTimestamp - currentTime;
      updateTimer(timeDifference);

      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = expiryTimestamp - currentTime;

        if (timeDifference <= 0) {
          clearInterval(interval);
          setTimer("Timer Expired");
        } else {
          updateTimer(timeDifference);
        }
      }, 1000);

      setTimer(interval);

      return () => clearInterval(interval);
    }, [expiryTimestamp]);

    const updateTimer = (time) => {
      const hours = Math.floor(time / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);

      const timerDisplay = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setTimer(timerDisplay);
    };

    return <div>{timer}</div>;
  };

  async function retrievingItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false)
  }

  useEffect(() => {
    retrievingItems();
  }, [loading]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {items.length > 0 && (
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={10}
              nav
              responsive={{
                0: { items: 1 },
                500: { items: 2 },
                768: { items: 3 },
                1000: { items: 4 },
              }}
            >
              {items.slice(0, 6).map((user) => (
                <div key={user.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${user.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
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
                        {loading ? <Skeleton className="user-title__skeleton" /> : <h4>{user.title}</h4>}
                      </Link>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <div className="nft__item_price">{user.price} ETH</div>
                      )}
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{user.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
