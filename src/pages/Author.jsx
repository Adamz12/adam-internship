import React, { useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [nftCollection, setNftCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // t
    async function authorProfile() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthorData(data);
      setNftCollection(data.nftCollection);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    authorProfile();
  }, [id, loading]);

  const { authorName, authorImage, tag, address, followers } = authorData;

  function follow() {
    if (authorData.isFollowing) {
      setAuthorData((prevData) => ({
        ...prevData,
        followers: prevData.followers - 1,
        isFollowing: false,
      }));
    } else {
      setAuthorData((prevData) => ({
        ...prevData,
        followers: prevData.followers + 1,
        isFollowing: true,
      }));
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {loading ? (
          <Skeleton className="author__banner--skeleton" />
        ) : (
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
        )}

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton className="profile_avatar--skeleton" />
                      ) : (
                        <img src={authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {loading ? (
                          <div className="skeleton__container">
                            <Skeleton className="author-name--skeleton" />
                            <Skeleton className="tag--skeleton" />
                            <Skeleton className="address--skeleton" />
                          </div>
                        ) : (
                          <h4>
                            {authorName}
                            <span className="profile_username">@{tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton className="followers__skeleton" />
                      ) : (
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                      )}
                      {loading ? (
                        <Skeleton className="follow-btn__skeleton" />
                      ) : (
                        <Link to="#" className="btn-main" onClick={follow}>
                          Follow
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={nftCollection}
                    authorImage={authorImage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
