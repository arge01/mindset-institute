import React from 'react';

import MultipleTab from 'component/MultipleTab';
import { useQueryRouter } from 'hooks/useQueryRouter';

function Container({ children, menu }) {
  const [params, setParams] = useQueryRouter();
  return (
    <div className="capsule-tab-menu">
      <section className="tab-menu">
        <MultipleTab>
          <MultipleTab.Menu tabs={menu} />
          <MultipleTab.Items params={params} setParams={setParams}>
            {children}
          </MultipleTab.Items>
        </MultipleTab>
      </section>
    </div>
  );
}

export default Container;
