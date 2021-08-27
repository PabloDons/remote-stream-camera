import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import Url from "url-parse";
import css from "./HostApp.module.css";

const HostApp = () => {
  const params = new Url(window.location.href, true).query;
  const [stream, setStream] = useState();
  const [peer, setPeer] = useState();
  const [peerReady, setPeerReady] = useState(false);
  const [currentConn, setCurrentConn] = useState();
  const refVideo = useRef(null);

  useEffect(() => {
    if (peer && !peer.disconnected && !peer.destroyed) return;
    if (peer && !peer.destroyed) {
      peer.reconnect();
      return;
    }

    if (peer) peer.destroy();

    const newPeer = new Peer(params.id);

    newPeer.on("open", id => {
      setPeerReady(true);
      console.log(`client ready with ID: ${id}`);
    });

    newPeer.on("error", () => setPeerReady(false));
    newPeer.on("disconnected", () => setPeerReady(false));

    newPeer.on("call", call => {
      console.log(`recieved call from ${call.peer}`);
      if (currentConn) currentConn.close();
      call.on("stream", stream => {
        setStream(stream);
      });
      call.answer();
      setCurrentConn(call);
    });

    setPeer(newPeer);

    return () => {
      if (peer) {
        peer.destroy();
        setPeer(undefined);
      }
      setPeerReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerReady]);

  useEffect(() => {
    if (!stream) return;
    refVideo.current.srcObject = stream;
  }, [stream]);

  return (
    <div className={css.container}>
      <video className={css.stream} ref={refVideo} autoPlay></video>
    </div>
  );
};

export default HostApp;
