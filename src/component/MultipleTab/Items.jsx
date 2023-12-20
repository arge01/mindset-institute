/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import MultipleTab from 'component/MultipleTab';
import { useRouter } from 'next/router';

function Items({ children, params }) {
  const router = useRouter();

  const {
    setActive,
    active,
    setPages,
    pages,
    setLike,
    menu,
    setInitial,
    like,
  } = useContext(MultipleTab.Context);

  useEffect(() => {
    if (!pages.length && params) {
      let _ = {};
      let index = 0;
      let count = params?.page?.length;
      if (Array.isArray(params?.page)) {
        let filter_count = params?.page?.filter(
          (f) => f === params?.active
        )?.length;

        if (filter_count < Number(params?.like)) {
          for (let i = 0; i < Number(params?.like) - filter_count; i++) {
            const query = params?.active;
            pages[index] = {
              id: menu.find((f) => f?.query === query)?.id,
              name: menu.find((f) => f?.query === query)?.name,
              like:
                pages?.filter((f) => f?.query === query?.query)?.length + 1 ||
                1,
              query,
              key: index,
              passive: true,
            };
            if (params?.page[index] === params?.active) {
              index++;
              count++;
            }
          }
        }
        for (index; index < count; index++) {
          const query = menu.find(
            (f) => f?.query === (params?.page?.[index] || params?.active)
          );
          pages[index] = {
            id: query?.id,
            name: query?.name,
            like:
              pages?.filter((f) => f?.query === query?.query)?.length + 1 || 1,
            query: query?.query,
            key: index,
          };
        }
        setPages([...pages]);
        setInitial([...pages]);
      } else {
        const query = params?.page;
        for (let index = 0; index < params?.like; index++) {
          if (Number(index) + 1 === Number(params?.like)) {
            pages[index] = {
              id: menu.find((f) => f?.query === query)?.id,
              name: menu.find((f) => f?.query === query)?.name,
              like: index + 1,
              query,
              key: index,
            };
          } else {
            pages[index] = {
              id: menu.find((f) => f?.query === query)?.id,
              name: menu.find((f) => f?.query === query)?.name,
              like: index + 1,
              query,
              key: index,
              passive: true,
            };
          }
        }
        setPages([...pages]);
        setInitial([...pages]);
      }
      _ =
        pages?.find(
          (f) =>
            f?.query === params?.active &&
            Number(f?.like) === Number(params?.like)
        ) || {};
      if (!_?.passive && _?.query && _?.like) {
        setLike(_);
        setActive(params?.active);
      }
    }
  }, [params]);

  const del = (v, key) => {
    const d = pages[pages.find((f) => f === v)?.key];
    d.passive = true;
    setPages(pages);

    if (
      v?.query === params?.active &&
      Number(v?.like) === Number(params?.like)
    ) {
      const f = pages.filter((f) => !f?.passive && f !== v);
      let _ = {};

      if (Number(key) < Number(f.length)) {
        if (f?.length - v?.key > 1) {
          _ = f[f?.length - v?.key] || {};
        } else {
          _ = f[0] || {};
        }
      } else {
        if (f.length - 1 > 0) {
          _ = f[f.length - 1] || {};
        } else {
          _ = f[0] || {};
        }
      }
      setLike(_);
      setActive(_?.query);

      if (_?.key >= 0) {
        router.push({
          query: {
            page: pages.filter((f) => !f?.passive).map((v) => v?.query),
            active: `${_.query}`,
            like: `${_.like}`,
          },
        });
      } else {
        router.push({ query: undefined });
      }
    } else {
      router.push({
        query: {
          page: pages.filter((f) => !f?.passive).map((v) => v?.query),
          active: `${like.query}`,
          like: `${like.like}`,
        },
      });
    }
  };

  const onChangeActivePage = (v) => {
    setLike(v);
    setActive(v?.query);

    router.push({
      query: {
        page: pages.filter((f) => !f?.passive).map((v) => v?.query),
        active: `${v?.query}`,
        like: `${v?.like}`,
      },
    });
  };
  return (
    <section className="menu-items">
      <ul>
        {pages
          .filter((f) => !f?.passive)
          .map((v, k) => {
            return (
              <React.Fragment key={k}>
                <li
                  className={`${
                    v?.query === params?.active &&
                    Number(v?.like) === Number(params?.like)
                      ? 'active'
                      : ''
                  }`}
                >
                  <span onClick={() => del(v, k)} className="delete">
                    <i className="fas fa-times"></i>
                  </span>
                  <button onClick={() => onChangeActivePage({ ...v })}>
                    {v?.name}
                  </button>
                </li>
              </React.Fragment>
            );
          })}
      </ul>
      <section className="items">
        {children?.find((f) => f?.props?.name === active)}
      </section>
    </section>
  );
}

export default Items;
