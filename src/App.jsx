import { useState, useEffect } from "react";
import {
  Button,
  Field,
  Input,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  makeResetStyles,
  tokens,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";

const useStackClassName = makeResetStyles({
  display: "flex",
  flexDirection: "column",
  rowGap: tokens.spacingVerticalL,
});

const useStyles = makeStyles({
  root: {
    maxWidth: "600px",
    ...shorthands.margin("0", "auto"),
  },
});

const App = () => {
  const [suffix, setSuffix] = useState(
    "BEST SELLER -|PALING LARIS !!|TERMURAH !!|PRODUK BARU !!|TERLARIS -|PROMO -|DISKON MENARIK -|BIG SALE -|ORIGINAL -|CUCI GUDANG -|PROMO GILA -"
  );
  const [produk, setProduk] = useState("isi dengan nama produk");
  const [preffix, setPreffix] = useState("COD|- Bisa COD|~ Bayar Dirumah");
  const [outputList, setOutputList] = useState([]);

  const classes = useStyles();

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
    <div className={classes.root}>
      <div className={useStackClassName()}>
        <Field label="Suffix">
          <Input
            defaultValue={suffix}
            onChange={(e) => setSuffix(e.target.value)}
          />
        </Field>
        <Field label="Produk">
          <Input
            defaultValue={produk}
            onChange={(e) => setProduk(e.target.value)}
          />
        </Field>
        <Field label="Preffix">
          <Input
            defaultValue={preffix}
            onChange={(e) => setPreffix(e.target.value)}
          />
        </Field>

        <Button appearance="primary" onClick={generateOutput}>
          Generate
        </Button>
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
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <Button appearance="secondary" onClick={handleCopyAll}>
              Copy All
            </Button>
          </PopoverTrigger>
          <PopoverSurface>
            <div>
              <h3>Copied!</h3>
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

export default App;
