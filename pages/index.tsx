import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {}};
}
