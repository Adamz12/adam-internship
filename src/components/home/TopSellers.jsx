import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTopSellets() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    console.log(data);
    setSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getTopSellets();
  }, [loading]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((user) => (
                <li key={user.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${user.authorId}`}>
                      {loading ? (
                        <Skeleton className="author-img__skeleton" />
                      ) : (
                        <img
                          className="lazy pp-author"
                          src={user.authorImage}
                          alt=""
                        />
                      )}
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    {loading ? (
                      <Skeleton className="author-name__skeleton" />
                    ) : (
                      <Link to={`/author/${user.authorId}`}>
                        {user.authorName}
                      </Link>
                    )}
                    {loading ? (
                      <Skeleton className="price__skeleton" />
                    ) : (
                      <span>{user.price} ETH</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
