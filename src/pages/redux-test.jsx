import React, { useEffect } from 'react';

import Layout from 'component/Layout';

import { useSelector, useDispatch } from 'react-redux';
import { findAll } from 'services/json-placeholder';

function ReduxTest() {
  const dispatch = useDispatch();
  const jsonPlaceholder = useSelector((state) => state.jsonPlaceholder);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);
  return (
    <Layout title="Redux Test">
      <div className="container mx-auto">
        <ul className="flex flex-wrap justify-center">
          {jsonPlaceholder.loading && <li className="flex-1">...loading</li>}
          {jsonPlaceholder.isSuccess && (
            <>
              {jsonPlaceholder.entities.map((v) => (
                <li
                  className="m-3 w-full bg-slate-50 p-2 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"
                  key={v.id}
                >
                  <b>title: </b>
                  {v.title}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </Layout>
  );
}

export default ReduxTest;
