import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const AuthorItems = ({ nftCollection, authorImage, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((item) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.nftId}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    {loading ? (
                      <Skeleton className="items-circle__skeleton" />
                    ) : (
                      <img className="lazy" src={authorImage} alt="" />
                    )}
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                  <Link to={`/item-details/${item.nftId}`}>
                    {loading ? (
                      <Skeleton className="img__skeleton" />
                    ) : (
                      <img
                        src={item.nftImage}
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
                      <h4>{item.title}</h4>
                    )}
                  </Link>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <div className="nft__item_price">{item.price} ETH</div>
                  )}
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
