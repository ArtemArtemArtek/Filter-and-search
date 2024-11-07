import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult";
import './App.css'

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchDeviceData = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/gadgetData");

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
        console.log(json)
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchDeviceData();
  }, []);

  const searchGadget = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((device) =>
      device.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterGadget = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((device) =>
      device.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Phone",
      type: "phone",
    },
    {
      name: "TV",
      type: "tv",
    },
    {
      name: "Laptop",
      type: "laptop",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      <div>
        <div className="header">
          <div >
            <img src="/logo.svg" alt="logo" className='logo'/>
          </div>

          <div className="search">
            <input onChange={searchGadget} placeholder="Search gadget" className="inputDevice"/>
          </div>
        </div>

        <div className="filterContainer">
          {filterBtns.map((value) => (
            <button  className="filterButton"
            isSelected={selectedBtn === value.type}
              // style={{background:isSelected? "#f22f2f" : "#ff4343"}}

              key={value.name}
              onClick={() => filterGadget(value.type)}
            >
              {value.name}
            </button>
          ))}
        </div>
      </div>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

