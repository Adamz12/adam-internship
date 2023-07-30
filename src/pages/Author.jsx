import React, { useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState({});
  // const [authorName, setAuthorName] = useState("");
  // const [authorImage, setAuthorImage] = useState(null);
  // Add a loading state for the image
  const [loadingImage, setLoadingImage] = useState(true);

  // async function authorProfile(authorId) {
  //   const { data } = await axios.get(
  //     `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
  //   );
  //   console.log(data);
  //   setAuthorData(data)

  // }

  // useEffect(() => {
  //   authorProfile(authorId);
  // }, [authorId]);

  //   // Destructure the authorData for easier access
  //   const { authorName, authorImage } = authorData;

  // async function authorProfile(authorId) {
  //   try {
  //     const { data } = await axios.get(
  //       `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
  //     );
  //     console.log(data);
  //     setAuthorData(data);

  //     setAuthorName(data.authorName);
  //     setAuthorImage(data.authorImage);
  //   } catch (error) {
  //     // Handle error, e.g., setAuthorData to null or show an error message
  //     console.error("Error fetching author data:", error);
  //     setAuthorData(null);
  //   }
  // }

  // useEffect(() => {
  //   const authorId = 73855012
  //   authorProfile(authorId);
  // }, [authorId]);

  // // Check if authorData is null before trying to destructure it
  // if (authorData === null) {
  //   return <div>Loading...</div>; // Render a loading state while fetching data
  // }

  // async function authorProfile(authorId) {
  //   try {
  //     const { data } = await axios.get(
  //       `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
  //     );
  //     console.log(data);
  //     setAuthorData(data);

  //     setAuthorName(data.authorName);
  //     setAuthorImage(data.authorImage);

  //     // After setting the authorImage, set loadingImage to false
  //     setLoadingImage(false);
  //   } catch (error) {
  //     // Handle error, e.g., setAuthorData to null or show an error message
  //     console.error("Error fetching author data:", error);
  //     setAuthorData(null);
  //     setLoadingImage(false); // Ensure loading state is also updated in case of an error
  //   }
  // }

  //   useEffect(() => {
  //   const authorId =
  //   83937449
  //   authorProfile(authorId);
  // }, [authorId]);

  // // ... (previous code) ...

  // // Check if authorData is null or image is loading before trying to destructure it
  // if (authorData === null || loadingImage) {
  //   return <div>Loading...</div>; // Render a loading state while fetching data or image
  // }

// Destructure the authorData for easier access
const { authorName, authorImage } = authorData;

async function authorProfile(authorId) {
  try {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    console.log(data);
    setAuthorData(data);

    // After setting the authorImage, set loadingImage to false
    setLoadingImage(false);
  } catch (error) {
    // Handle error, e.g., setAuthorData to an empty object or show an error message
    console.error("Error fetching author data:", error);
    setAuthorData({});
    setLoadingImage(false); // Ensure loading state is also updated in case of an error
  }
}

useEffect(() => {
  authorProfile(authorId);
}, [authorId]);

// Check if authorData is empty or image is loading before trying to destructure it
if (Object.keys(authorData).length === 0 || loadingImage) {
  return <div>Loading...</div>; // Render a loading state while fetching data or image
}


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorImage?.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          Monica Lucas{authorName}
                          <span className="profile_username">@monicaaaa</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">573 followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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
