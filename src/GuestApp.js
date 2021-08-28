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
  const refIncludeAudio = useRef(null);
  const refAudioSource = useRef(null);
  const [videoSource, setVideoSource] = useState();
  const [audioSource, setAudioSource] = useState();
  const [includeAudio, setIncludeAudio] = useState(false);

  useEffect(() => {
    setVideoSource(refVideoSource.current?.value);
  }, [refVideoSource.current?.value]);

  useEffect(() => {
    setAudioSource(refAudioSource.current?.value);
  }, [refAudioSource.current?.value]);

  useEffect(() => {
    setIncludeAudio(refIncludeAudio.current?.checked);
  }, [refIncludeAudio.current?.checked]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        setDeviceInfos(devices);
      })
      .catch(handleError);
  }, [userStream]);

  useEffect(() => {
    if (peer && !peer.disconnected && !peer.destroyed) return;
    if (peer && !peer.destroyed) {
      peer.reconnect();
      setPeerReady(true);
      return;
    }

    if (peer) {
      setPeerReady(false);
      peer.destroy();
    }

    const newPeer = new Peer();

    newPeer.on("open", id => {
      setPeerReady(true);
      console.log(`client ready with ID: ${id}`);
    });

    newPeer.on("error", err => {
      console.error(err);
      setPeerReady(false);
    });
    newPeer.on("disconnected", err => {
      console.error(err);
      setPeerReady(false);
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
  }, [peer?.disconnected, peer?.destroyed]);

  useEffect(() => {
    if (videoSource === undefined) return;

    console.log(includeAudio);

    const constraints = {
      ...(includeAudio && { audio: { deviceId: audioSource ? { exact: audioSource } : undefined } }),
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        setUserStream(stream);
        refVideo.current.srcObject = stream;
      })
      .catch(handleError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSource, includeAudio]);

  useEffect(() => {
    if (!peerReady) return;
    if (!userStream) return;

    console.log(`calling peerId ${params.id}`);
    const conn = peer.call(params.id, userStream);

    return () => {
      conn.close();
    };
  }, [params.id, userStream, peerReady, peer]);

  function onChangeVideoSource() {
    setVideoSource(refVideoSource.current?.value);
  }

  function onChangeAudioSource() {
    setAudioSource(refAudioSource.current?.value);
  }

  function onChangeIncludeAudio() {
    setIncludeAudio(refIncludeAudio.current?.checked);
  }

  return (
    <div>
      <h1>
        remote-stream-camera (<a href={"https://github.com/PabloDons/remote-stream-camera"}>github</a>)
      </h1>
      <div id="container">
        <p>
          <b>Note:</b> without permission, the browser will restrict the available devices to at most one per type.
        </p>
        <div className="select">
          <label>
            {"Video source: "}
            <select ref={refVideoSource} onChange={onChangeVideoSource}>
              {deviceInfos
                .filter(deviceInfo => deviceInfo.kind === "videoinput")
                .map((deviceInfo, index) => (
                  <option key={deviceInfo.deviceId} value={deviceInfo.deviceId}>
                    {deviceInfo.label || `camera ${index}`}
                  </option>
                ))}
            </select>
          </label>
          <br />
          <input ref={refIncludeAudio} type="checkbox" onChange={onChangeIncludeAudio} />
          <label>
            {" Audio source: "}
            <select ref={refAudioSource} onChange={onChangeAudioSource}>
              {deviceInfos
                .filter(deviceInfo => deviceInfo.kind === "audioinput")
                .map((deviceInfo, index) => (
                  <option key={deviceInfo.deviceId} value={deviceInfo.deviceId}>
                    {deviceInfo.label || `microphone ${index}`}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>
      <video style={{ width: "80vw" }} ref={refVideo} autoPlay muted />
    </div>
  );
};

export default GuestApp;
