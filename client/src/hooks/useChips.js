import { selectDefault } from "common/helpers/defaults";
import React from "react";

export const useChips = () => {
  const [chips, setChips] = React.useState([]);

  const handleChips = (item) => {
    setChips((chips) =>
      !chips.filter((chip) => chip.item.id === item.id).length
        ? [
            ...chips,
            {
              index: chips.length,
              item: item,
              typeValue: selectDefault,
            },
          ]
        : chips
    );
  };

  return {
    chips,
    handleChips,
    setChips,
  };
};

export default useChips;
