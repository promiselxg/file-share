import { useMemo, useState } from "react";

const useCheckboxStates = (initialState = {}) => {
  const [checkedStates, setCheckedStates] = useState(initialState);
  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheckboxChange = (id, checked) => {
    setCheckedStates((prev) => ({
      ...prev,
      [id]: checked,
    }));

    setCheckedIds((prevIds) => {
      if (checked) {
        return [...prevIds, id];
      } else {
        return prevIds.filter((itemId) => itemId !== id);
      }
    });
  };

  const resetCheckBox = () => {
    setCheckedStates({});
    setCheckedIds([]);
  };
  const checkedCount = useMemo(() => checkedIds.length, [checkedIds]);

  return {
    checkedStates,
    checkedIds,
    checkedCount,
    handleCheckboxChange,
    resetCheckBox,
  };
};

export default useCheckboxStates;
