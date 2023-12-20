import React, { useContext } from 'react';

import MultipleTab from 'component/MultipleTab';

function Page() {
  const { handleData, like, initial, setMenu, menu, propToState } =
    useContext(MultipleTab.Context) || {};

  const onChange = (e) => {
    handleData(
      {
        [e.target.name]: e.target.value,
      },
      like
    );
  };

  const create = () => {
    setMenu([
      ...menu,
      {
        id: 4,
        name: 'D tab',
        query: 'd-tab',
      },
    ]);
  };
  return (
    <>
      <div>
        <b>Name: </b> {like.name}
      </div>
      <div>
        <b>Like: </b> {like.like}
      </div>
      <div>
        <b>Query / Id: </b> {`${like.query} / ${like.id}`}
      </div>
      <div>
        <b>Count: </b> {initial?.length}
      </div>
      {propToState && (
        <div>
          <b>Input</b>{' '}
          <input
            type="text"
            name="my-input"
            value={
              initial[like?.key]?.initailData?.['my-input'] ||
              propToState?.['my-input']
            }
            onChange={onChange}
          />
        </div>
      )}
      <div>
        <b>Create d tab: </b> <button onClick={create}>Create</button>
      </div>
    </>
  );
}

export default Page;
