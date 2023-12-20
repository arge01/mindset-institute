/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';

import Menu from './Menu';
import Items from './Items';
import Page from './Page';
import Container from './Container';

const Context = createContext();

function MultipleTab({ children }) {
  const [pages, setPages] = useState([]);
  const [propToState, setPropToState] = useState([]);
  const [menu, setMenu] = useState([]);
  const [active, setActive] = useState(null);
  const [initial, setInitial] = useState([]);
  const [like, setLike] = useState({});

  const handleData = (initailData, like) => {
    const tabs = initial?.filter((f) => f.query === like?.query);
    const tab = tabs.find((f) => f?.like === like?.like);
    tab.initailData = initailData;

    setInitial([...initial]);
  };

  useEffect(() => {
    setPropToState(
      children[1]?.props?.children.find((f) => f?.props.name === active)?.props
        ?.initialData?.data
    );
  }, [active]);
  return (
    <Context.Provider
      value={{
        pages,
        setPages,
        propToState,
        setPropToState,
        menu,
        setMenu,
        active,
        setActive,
        initial,
        setInitial,
        like,
        setLike,
        handleData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

Object.assign(MultipleTab, {
  Menu,
  Items,
  Page,
  Container,
  Context,
});

export default MultipleTab;
