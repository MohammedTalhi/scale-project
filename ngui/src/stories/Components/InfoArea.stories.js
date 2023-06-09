import React from "react";
import InfoArea from "components/Table/components/InfoArea";
import { KINDS } from "stories";

export default {
  title: `${KINDS.COMPONENTS}/InfoArea`,
  argTypes: {
    rowCount: { name: "Row count", control: "number", defaultValue: 1 }
  }
};

export const basic = () => (
  <InfoArea selectedRowsCount={10} showCounters hideTotal={false} totalNumber={5050} rowsLength={20} />
);

export const displayedFromTo = () => (
  <InfoArea
    selectedRowsCount={10}
    showCounters
    hideTotal={false}
    totalNumber={5050}
    rowsLength={20}
    pageSize={20}
    pagesNum={5000 / 20}
    currentPage={0}
  />
);

export const withKnobs = (args) => {
  return <InfoArea showCounters hideTotal rowsLength={args.rowCount} />;
};
