import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Panell, CustomButton, SpecialBox } from "./styles.js"
import Popup from "./Popup.js"

const App = () => {
  const [prices, setPrices] = useState({ webpage: 500, seo: 300, googleAds: 200 });
  const [amountLanguages, setAmountLanguages] = useState(0);
  const [amountPages, setAmountPages] = useState(0);
  const [amountWebPage, setAmountWebPage] = useState(0);
  const [amountSeo, setAmountSeo] = useState(0);
  const [amountGoogle, setAmountGoogle] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [nomPressupost, setNomPressupost] = useState("");
  const [nomClient, setNomClient] = useState("");
  const [llistat, setLlistat] = useState([]);
  const [searchedName, setSearchedName] = useState("");

  let params = useParams();

  useEffect(() => {
    if (params.amountLanguages) {
      setAmountLanguages(Number(params.amountLanguages));
    }
    if (params.amountPages) {
      setAmountPages(Number(params.amountPages));
    }
    if (params.amountWebPage) {
      setAmountWebPage(Number(params.amountWebPage));
    }
    if (params.amountSeo) {
      setAmountSeo(Number(params.amountSeo));
    }
    if (params.amountGoogle) {
      setAmountGoogle(Number(params.amountGoogle));
    }
    if (params.totalPrice) {
      setTotalPrice(Number(params.totalPrice));
    }
    if (params.nomPressupost) {
      setNomPressupost(params.nomPressupost);
    }
    if (params.nomClient) {
      setNomClient(params.nomClient);
    }
  }, [params]);

  const navigate = useNavigate();

  const url = `/app/${amountLanguages}/${amountPages}/${amountWebPage}/${amountSeo}/${amountGoogle}/${totalPrice}/${nomPressupost}/${nomClient}`;

  useEffect(() => {
    navigate(url, { replace: true });
  }, [url, navigate]);

  useEffect(() => {
    const storedLanguages = localStorage.getItem('amountLanguages');
    if (amountLanguages) {
      setAmountLanguages(JSON.parse(storedLanguages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('amountLanguages', JSON.stringify(amountLanguages));
  }, [amountLanguages]);

  useEffect(() => {
    const storedPages = localStorage.getItem('amountPages');
    if (amountPages) {
      setAmountPages(JSON.parse(storedPages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('amountPages', JSON.stringify(amountPages));
  }, [amountPages]);

  useEffect(() => {
    const storedWebPage = localStorage.getItem('amountWebPage');
    if (amountWebPage) {
      setAmountWebPage(JSON.parse(storedWebPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('amountWebPage', JSON.stringify(amountWebPage));
  }, [amountWebPage]);

  useEffect(() => {
    const storedSeo = localStorage.getItem('amountSeo');
    if (amountSeo) {
      setAmountSeo(JSON.parse(storedSeo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('amountSeo', JSON.stringify(amountSeo));
  }, [amountSeo]);


  useEffect(() => {
    const storedGoogle = localStorage.getItem('amountGoogle');
    if (amountGoogle) {
      setAmountGoogle(JSON.parse(storedGoogle));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('amountGoogle', JSON.stringify(amountGoogle));
  }, [amountGoogle]);

  useEffect(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (totalPrice) {
      setTotalPrice(JSON.parse(storedTotalPrice));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [totalPrice]);

  useEffect(() => { localStorage.setItem('llistat', JSON.stringify(llistat)); }, [llistat]);


  function handleChange(event) {
    const { name } = event.target;
    const price = prices[name];
    let newTotalPrice = event.target.checked ? totalPrice + price : totalPrice - price;
    if (name === "webpage") {
      setChecked(event.target.checked)
    }
    if (event.target.checked) {
      if (name === "webpage") {
        setAmountWebPage(price)
      }
      if (name === "seo") {
        setAmountSeo(price)
      }
      if (name === "googleAds") {
        setAmountGoogle(price)
      }
    }
    setTotalPrice(newTotalPrice);
  }

  function handlePressupost(event) {
    setNomPressupost(event.target.value)
  }

  function handleClient(event) {
    setNomClient(event.target.value);
  }

  useEffect(() => {
    setTotalPrice(
      amountWebPage + amountSeo + amountGoogle + (amountPages * 30) + (amountLanguages * 30)
    );
  }, [amountPages, amountLanguages]);

  function increase() {
    setAmountPages(parseInt(amountPages) + 1)
  }

  function decrease() {
    if (amountPages > 0) {
      setAmountPages(parseInt(amountPages) - 1)
    }
  }

  function increaseLanguages() {
    setAmountLanguages(parseInt(amountLanguages) + 1)
  }

  function decreaseLanguages() {
    if (amountLanguages > 0) {
      setAmountLanguages(parseInt(amountLanguages) - 1)
    }
  }


  function handleLlistat() {
    setLlistat((prevState) => {
      const newObject = {
        client: nomClient,
        pressupost: nomPressupost,
        languages: amountLanguages,
        pages: amountPages,
        seo: amountSeo,
        google: amountGoogle,
        price: totalPrice,
        date: new Date(),
      };
      return [...prevState, newObject];
    });
  }

  function orderPressupost() {
    setNomPressupost("");
    setNomClient("");
    setLlistat((prevState) => {
      return [...prevState].sort((a, b) => {
        if (a.pressupost < b.pressupost) {
          return -1;
        }
        if (a.pressupost > b.pressupost) {
          return 1;
        } return 0;
      });
    });
    console.log(llistat);
  }

  function orderDate() {
    setLlistat((prevState) => {
      return [...prevState].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
    console.log(llistat);
  }

  function resetOrder() {
    setLlistat((prevState) => {
      return [...prevState].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    });
    console.log(llistat);
  }

  const filteredNames = llistat.filter(function (item) { return item.pressupost === searchedName; });
  useEffect(() => {
    console.log(filteredNames);
  }, [filteredNames]);
  console.log(searchedName);

  return (
    <div>
      <p>Que quieres hacer?</p>
      <div>
        <input
          type="checkbox"
          name="webpage"
          onChange={handleChange} /><label>Una pàgina web ({prices.webpage}€)</label>
      </div>
      <Panell checked={checked}>
        <label>Número de páginas</label>
        <CustomButton onClick={increase}>+</CustomButton>
        <input
          type="number"
          name="pages"
          id="pages"
          value={amountPages}
          onChange={(e) => setAmountPages(e.target.value)}
        />
        <CustomButton onClick={decrease}>-</CustomButton>
        <Popup text="This is where you have to indicate the amount of pages your website will have"></Popup>
        <div>
          <label>Número de idiomas</label>
          <CustomButton onClick={increaseLanguages}>+</CustomButton>
          <input
            type="number"
            name="languages"
            id="languages"
            value={amountLanguages}
            onChange={(e) => setAmountLanguages(e.target.value)}
          />
          <CustomButton onClick={decreaseLanguages}>-</CustomButton>
          <Popup text="This is where you have to indicate the amount of languages your website will have"></Popup>
        </div>
      </Panell>
      <div>
        <input
          type="checkbox"
          name="seo"
          onChange={handleChange}
        /><label>Una consultoria SEO ({prices.seo}€)</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="googleAds"
          onChange={handleChange} /><label>Una campanya de Google Ads ({prices.googleAds}€)</label>
      </div>
      <p>Preu: {totalPrice}€</p>
      <label>
        Nom pressupost:
        <input type="text"
          value={nomPressupost}
          onChange={handlePressupost} />
      </label>
      <label>
        Nom client:
        <input type="text"
          value={nomClient}
          onChange={handleClient} />
      </label>
      <button onClick={handleLlistat}>Save</button>
      <SpecialBox>
        <p>Llistat</p>
        <button onClick={orderPressupost}>Order alphabetically</button>
        <button onClick={orderDate}>Order date</button>
        <button onClick={resetOrder}>Reset order</button>
        <input
          type="text"
          placeholder="Search"
          value={searchedName}
          onChange={(e) => setSearchedName(e.target.value)} />
        {filteredNames.length > 0 ? (filteredNames.map((item) => (
          <div key=
            {item.date}>
            <p>Nom client: {item.client}</p>
            <p>Nom pressupost: {item.pressupost}</p>
            <p>Quantitat de idiomas: {item.languages}</p>
            <p>Quantitat de paginas: {item.pages}</p>
            <p>Preu seo: {item.seo}</p>
            <p>Preu google: {item.google}</p>
            <p>Preu total: {item.price}</p>
            <p>Data: {item.date.toString()}</p>
          </div>
        ))) : (llistat.map((item) => (
          <div key=
            {item.date}>
            <p>Nom client: {item.client}</p>
            <p>Nom pressupost: {item.pressupost}</p>
            <p>Quantitat de idiomas: {item.languages}</p>
            <p>Quantitat de paginas: {item.pages}</p>
            <p>Preu seo: {item.seo}</p>
            <p>Preu google: {item.google}</p>
            <p>Preu total: {item.price}</p>
            <p>Data: {item.date.toString()}</p>
          </div>
        )))}
      </SpecialBox>
    </div>
  );
}


export default App;
