import React, { useRef, useState } from "react";
import "./styles/index.css";
import "./styles/index.theme.css";
import Engine from "./engine/enigine";
import SideNav from "./navigation/side-nav";
import AppContext from "./context/app-context";
import Loading from "./components/loading/loading";
import Login from "./auth/login";
import { IUsers } from "./context/interface";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean | string>("none");
  const [usersData, setUsersData] = useState<IUsers>({} as IUsers);
  const [sideNav, setSideNav] = useState<any>({ setActiveNav: () => {} });
  const [storedContext, setStoredContext] = useState({ setCourseScreen: () => {} });

  const engineRef = useRef<any>(null);

  const backendServer = `http://localhost:5500/etap/1680/api/elearn/v1`;

  const getSignedAwsUrl = async function (filename: string, bucketname: string) {
    if (!filename) return;

    if (filename.split(":")[0] === "https" || filename.split(":")[0] === "http") return filename;

    const imageFetchUrl = backendServer;
    const { data } = await (
      await fetch(`${imageFetchUrl}/file/aws/${bucketname}/${filename}`, {
        method: "GET",
        credentials: "include",
        headers: {
          token: localStorage.getItem("etaptoken") || "",
        },
      })
    ).json();

    return data;
  };

  function formatNumber(amount: number) {
    return new Intl.NumberFormat("en-us").format(amount);
  }

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateMobile = (mobile: string) => {
    return String(mobile)
      .toLowerCase()
      .match(/^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/);
  };

  const updateUsersData = async function () {
    try {
      const data = await (
        await fetch(`${backendServer}/users/get?email=${localStorage.getItem("etapemail")}`, {
          credentials: "include",
          headers: {
            token: localStorage.getItem("etaptoken") || "",
          },
        })
      ).json();

      setUsersData(data.data);

      return data?.data;
    } catch (err) {
      console.log(err);
    }
  };

  function patternMatching(wordone: string, wordtwo: string) {
    if (!wordone || !wordtwo) return false;
    //wrote this for name searching
    let result = wordone?.split("")?.some((e, i) => {
      return String(e)?.toUpperCase() !== String(wordtwo?.split("")[i])?.toUpperCase();
    });
    return !result;
  }

  function getCurrentHash() {
    return document?.location?.hash?.toLowerCase()?.replace("#", "")?.trim();
  }

  const getEtapToken = () => {
    const token = localStorage.getItem("etaptoken");
    if (token) return token;
    return "";
  };

  return (
    <AppContext.Provider
      value={{
        changeScreen: engineRef?.current?.changeScreen,
        setIsLoading,
        loggedIn,
        usersData,
        setUsersData,
        setLoggedIn,
        backendServer,
        getSignedAwsUrl,
        formatNumber,
        validateEmail,
        updateUsersData,
        patternMatching,
        validateMobile,
        getCurrentHash,
        getEtapToken,
        storedContext,
        setStoredContext,
      }}
    >
      <>
        {(!loggedIn || loggedIn === "none") && <Login />}

        {loggedIn === true && (
          <div>
            <div className="App">
              <SideNav loggedIn={loggedIn} setSideNav={setSideNav} />
              <Engine sideNav={sideNav} ref={engineRef} loggedIn={loggedIn} />
            </div>
          </div>
        )}

        <Loading show={isLoading} />
      </>
    </AppContext.Provider>
  );
}

export default App;
