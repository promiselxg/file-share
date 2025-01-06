import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const useCheckboxStates = (initialState = {}) => {
  const [checkedStates, setCheckedStates] = useState(initialState);
  const [checkedIds, setCheckedIds] = useState([]);
  const pathname = usePathname();

  //  handle checkbox change
  const handleCheckboxChange = (id, checked) => {
    setCheckedStates((prev) => ({
      ...prev,
      [id]: checked,
    }));

    // update the checkedIds array
    setCheckedIds((prevIds) => {
      if (checked) {
        return [...prevIds, id];
      } else {
        return prevIds.filter((itemId) => itemId !== id);
      }
    });
  };

  //  reset the checkbox
  const resetCheckBox = () => {
    setCheckedStates({});
    setCheckedIds([]);
  };

  //  count the number of checked items
  const checkedCount = useMemo(() => checkedIds.length, [checkedIds]);

  // reset the checkbox when the pathname changes
  useEffect(() => {
    resetCheckBox();
  }, [pathname]);

  return {
    checkedStates,
    checkedIds,
    checkedCount,
    handleCheckboxChange,
    resetCheckBox,
  };
};

export default useCheckboxStates;
