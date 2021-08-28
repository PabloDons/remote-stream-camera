import "./App.css";
import { useState } from "react";
import { v4 } from "uuid";
import url from "url";

function App() {
  const [id] = useState(v4);
  const hostUrl = url.resolve(window.location.href, url.format({ query: { id, host: "true" } }));
  const clientUrl = url.resolve(window.location.href, url.format({ query: { id } }));

  return (
    <div>
      <h1>
        remote-stream-camera (<a href={"https://github.com/PabloDons/remote-stream-camera"}>github</a>)
      </h1>
      <table>
        <thead>
          <tr>
            <td>{"URLs you need:"}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>For</td>
            <td>url</td>
          </tr>
          <tr>
            <td>Stream host</td>
            <td>
              <a href={hostUrl}>{hostUrl}</a>
            </td>
          </tr>
          <tr>
            <td>Stream guest</td>
            <td>
              <a href={clientUrl}>{clientUrl}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
