import { useState, useEffect } from "react";
import {
  AtlassianNavigation,
  PrimaryButton,
} from "@atlaskit/atlassian-navigation";

const App = () => {
  const [suffix, setSuffix] = useState(
    "BEST SELLER -|PALING LARIS !!|TERMURAH !!|PRODUK BARU !!|TERLARIS -|PROMO -|DISKON MENARIK -|BIG SALE -|ORIGINAL -|CUCI GUDANG -|PROMO GILA -"
  );
  const [produk, setProduk] = useState("isi dengan nama produk");
  const [preffix, setPreffix] = useState("COD|- Bisa COD|~ Bayar Dirumah");
  const [outputList, setOutputList] = useState([]);

  useEffect(() => {
    // Inisialisasi output setelah rendering komponen
    generateOutput();
  }, []);

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

    setOutputList(resultList);
  };

  const handleCopyAll = () => {
    const allOutputText = outputList.join("\n");
    navigator.clipboard.writeText(allOutputText);
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
        <button onClick={generateOutput}>Generate</button>
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
        <button
          style={{
            margin: "1rem 0",
          }}
          onClick={handleCopyAll}
        >
          Copy All
        </button>
      </div>
    </div>
  );
};

export default App;
