import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState({});
  const { nftid } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItemDetails() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftid}`
      );
      setItemDetails(data);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    getItemDetails();
  }, [nftid, loading]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton className="nft--img__skeleton" />
                ) : (
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton className="item--title__skeleton" />
                  ) : (
                    <h2>
                      {itemDetails.title} #{itemDetails.tag}
                    </h2>
                  )}

                  <div className="item_info_counts">
                    {loading ? (
                      <Skeleton className="views__skeleton" />
                    ) : (
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetails.views}
                      </div>
                    )}
                    {loading ? (
                      <Skeleton className="likes__skeleton" />
                    ) : (
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetails.likes}
                      </div>
                    )}
                  </div>
                  {loading ? (
                    <>
                      <Skeleton className="description__skeleton" />
                      <Skeleton className="description__skeleton" />
                      <Skeleton className="description__skeleton" />
                    </>
                  ) : (
                    <p>{itemDetails.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      {loading ? <Skeleton width={60} /> : <h6>Owner</h6>}
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            {loading ? (
                              <Skeleton className="items-circle__skeleton" />
                            ) : (
                              <img
                                className="lazy"
                                src={itemDetails.ownerImage}
                                alt=""
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={120} />
                          ) : (
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              {itemDetails.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      {loading ? <Skeleton width={60} /> : <h6>Creator</h6>}
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            {loading ? (
                              <Skeleton className="items-circle__skeleton" />
                            ) : (
                              <img
                                className="lazy"
                                src={itemDetails.creatorImage}
                                alt=""
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={120} />
                          ) : (
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              {itemDetails.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    {loading ? <Skeleton width={50} /> : <h6>Price</h6>}
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width={110} />
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{itemDetails.price}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
