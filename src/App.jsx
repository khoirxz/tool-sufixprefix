import React, { useState } from "react";
import {
  AtlassianNavigation,
  PrimaryButton,
} from "@atlaskit/atlassian-navigation";
import TextField from "@atlaskit/textfield";
import { Field } from "@atlaskit/form";

const App = () => {
  const [preffix, setPreffix] = useState("Preffix 1|Preffix 2");
  const [produk, setProduk] = useState("Produk 1|Produk 2");
  const [suffix, setSuffix] = useState("Suffix 1|Suffix 2");
  const [outputList, setOutputList] = useState([]);

  const generateOutput = () => {
    const suffixes = suffix.split("|");
    const produkList = produk.split("|");
    const preffixes = preffix.split("|");
    const resultList = [];

    for (let i = 0; i < suffixes.length; i++) {
      for (let j = 0; j < produkList.length; j++) {
        for (let k = 0; k < preffixes.length; k++) {
          const keyword = `${suffixes[i].trim()} ${produkList[
            j
          ].trim()} ${preffixes[k].trim()}`;
          resultList.push(keyword);
        }
      }
    }

    return resultList;
  };

  const handleGenerateKeyword = () => {
    const output = generateOutput();
    setOutputList(output);
  };

  return (
    <div>
      <AtlassianNavigation
        label="site"
        renderProductHome={() => null}
        primaryItems={[<PrimaryButton>TOOL</PrimaryButton>]}
      ></AtlassianNavigation>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          margin: "3rem auto",
        }}
      >
        <input
          placeholder="suffix"
          value={suffix}
          onChange={(e) => setSuffix(e.target.value)}
        />
        <input
          placeholder="produk"
          value={produk}
          onChange={(e) => setProduk(e.target.value)}
        />
        <input
          placeholder="preffix"
          value={preffix}
          onChange={(e) => setPreffix(e.target.value)}
        />

        <button onClick={handleGenerateKeyword}>Generate</button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          margin: "3rem auto",
        }}
      >
        <ul>
          {outputList.map((output, index) => (
            <li key={index}>{output}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
