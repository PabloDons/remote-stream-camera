/*
Based on this webrtc sample https://github.com/webrtc/samples/tree/gh-pages/src/content/devices/input-output
*/

import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import Url from "url-parse";

function handleError(error) {
  console.log("navigator.MediaDevices.getUserMedia error: ", error.message, error.name);
}

const GuestApp = () => {
  const params = new Url(window.location.href, true).query;

  const [deviceInfos, setDeviceInfos] = useState([]);
  const [userStream, setUserStream] = useState();
  const [peer, setPeer] = useState();
  const [peerReady, setPeerReady] = useState(false);

  const refVideo = useRef(null);
  const refVideoSource = useRef(null);
  const videoSource = refVideoSource.current && refVideoSource.current.value;

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        setDeviceInfos(devices);
      })
      .catch(handleError);
  });

  useEffect(() => {
    if (peer && !peer.disconnected && !peer.destroyed) return;
    if (peer && !peer.destroyed) {
      peer.reconnect();
      return;
    }

    if (peer) peer.destroy();

    const newPeer = new Peer();

    newPeer.on("open", id => {
      setPeerReady(true);
      console.log(`client ready with ID: ${id}`);
    });

    newPeer.on("error", () => setPeerReady(false));
    newPeer.on("disconnected", () => setPeerReady(false));

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
    if (!videoSource) return;
    const constraints = {
      audio: false,
      video: { deviceId: videoSource ? { exact: videoSource } : true },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        setUserStream(stream);
      })
      .catch(handleError);
  }, [videoSource]);

  useEffect(() => {
    if (!peerReady) return;
    if (!userStream) return;
    refVideo.current.srcObject = userStream;

    console.log(`calling peerId ${params.id}`);
    const conn = peer.call(params.id, userStream); // returns host media but unused

    return ()=>{
      conn.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, videoSource, userStream, peerReady]);
  return (
    <div>
      <div id="container">
        <p>
          <b>Note:</b> without permission, the browser will restrict the available devices to at most one per type.
        </p>
        <div className="select">
          <label htmlFor={refVideoSource.current}>Video source: </label>
          <select ref={refVideoSource}>
            {deviceInfos &&
              deviceInfos
                .filter(deviceInfo => deviceInfo.kind === "videoinput")
                .map((deviceInfo, index) => (
                  <option key={deviceInfo.deviceId} value={deviceInfo.deviceId}>
                    {deviceInfo.label || `camera ${index}`}
                  </option>
                ))}
          </select>
        </div>
      </div>
      <video ref={refVideo} autoPlay />
    </div>
  );
};

export default GuestApp;
