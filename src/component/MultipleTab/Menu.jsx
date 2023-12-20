import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import MultipleTab from 'component/MultipleTab';

function Menu({ tabs = [] }) {
  const router = useRouter();

  const { pages, setPages, setMenu, menu, setActive, setLike, setInitial } =
    useContext(MultipleTab.Context);

  useEffect(() => {
    setMenu(tabs);
  }, [setMenu, tabs]);

  const refArr = (arr, like, query, key) => {
    const tabs = arr.filter((f) => f.query === query);
    const tab = tabs.find((_, i) => i === like - 1);

    tab.like = like;
    tab.key = key;

    return arr;
  };

  const onChangeQuery = (e) => {
    const name = e.target.name;
    const _ = [...pages, tabs.find((f) => f.query === name)];
    const last = _.filter((f) => f.query === name)?.length || 0;
    const _like = {
      ...tabs.find((f) => f.query === name),
      like: last,
      key: pages.length,
    };

    setActive(name);
    setLike(_like);

    const arr = refArr(_, _like?.like, e.target.name, pages.length);
    setPages(arr);
    setInitial(arr);

    router.push({
      query: {
        page: _?.filter((f) => !f?.passive).map((v) => v?.query),
        active: `${name}`,
        like: `${last}`,
      },
    });
  };
  return (
    <ul className="menu">
      {menu?.map((v, k) => {
        return (
          <li key={k}>
            <a name={v.query} onClick={onChangeQuery}>
              {v.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Menu;
