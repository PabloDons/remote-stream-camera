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
      <table>
        <thead>
          <tr>
            <td>{"please use these urls for each stream:"}</td>
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
