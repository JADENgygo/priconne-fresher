import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const WebFontLoader = dynamic(() => import("../components/webFontLoader"), {
    ssr: false,
  });
  return (
    <div>
      <WebFontLoader className="mt-3" />
    </div>
  );
};

export default Home;
