import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { ProgressBar } from "react-bootstrap";

type Props = {
  className?: string;
};

const WebFontLoader = (props: Props) => {
  const [state, setState] = useState({
    progress: 0,
    loaded: false,
  });

  useEffect(() => {
    let intervalId = -1;
    WebFont.load({
      google: {
        families: ["Kosugi Maru", "Kosugi"],
      },
      timeout: 300000,
      loading: () => {
        intervalId = window.setInterval(() => {
          if (state.progress + 1 < 100) {
            setState((prev) => ({ ...prev, progress: prev.progress + 1 }));
          } else {
            setState((prev) => ({ ...prev, progress: 99 }));
          }
        }, 200);
      },
      active: () => {
        clearInterval(intervalId);
        setState({ ...state, progress: 100, loaded: true });
      },
    });
    return () => {
      if (intervalId !== -1) {
        clearInterval(intervalId);
      }
    };
  }, []);
  return (
    <div className={props.className + " container"}>
      {!state.loaded && <ProgressBar now={state.progress} />}
      {state.loaded && <Content />}
    </div>
  );
};

export default WebFontLoader;
