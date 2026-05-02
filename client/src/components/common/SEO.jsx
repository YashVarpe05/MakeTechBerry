import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, name, type }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | MakeTechBerry` : "MakeTechBerry | Innovating Learning & Building Digital Futures"}</title>
      <meta name="description" content={description || "MakeTechBerry LLP is a startup dedicated to providing comprehensive training and internship programs in App Development, Web Development, Gen-AI, and Python Full Stack Development."} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title || "MakeTechBerry"} />
      <meta property="og:description" content={description || "Innovating learning & building digital futures with MakeTechBerry."} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || "MakeTechBerry"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "MakeTechBerry"} />
      <meta name="twitter:description" content={description || "Innovating learning & building digital futures with MakeTechBerry."} />
    </Helmet>
  );
};

export default SEO;
