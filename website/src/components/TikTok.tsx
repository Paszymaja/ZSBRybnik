import React, { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface TikTokProps {
  children: ReactNode;
}

const TikTok = ({ children }: TikTokProps) => {
  return (
    <>
      <Helmet>
        <script async src="https://www.tiktok.com/embed.js"></script>
      </Helmet>
      {children}
    </>
  );
};

export default TikTok;
