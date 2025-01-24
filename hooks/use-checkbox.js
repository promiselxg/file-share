import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const useCheckboxStates = (initialState = {}) => {
  const [checkedStates, setCheckedStates] = useState(initialState);
  const [checkedIds, setCheckedIds] = useState([]);
  const pathname = usePathname();

  /**
   * Handle the checkbox state
   * @param {string} id - the ID of the folder or document.
   * @param {boolean} checked - the state of the checkbox.
   * @param {string} docType - either folder or document
   */
  const handleCheckboxChange = (id, checked, docType) => {
    setCheckedStates((prev) => ({
      ...prev,
      [id]: checked,
    }));

    // update the checkedIds array
    setCheckedIds((prevIds) => {
      if (checked) {
        return [...prevIds, { id, docType }];
      } else {
        return prevIds.filter((itemId) => itemId !== id);
      }
    });
  };

  const resetCheckBox = () => {
    setCheckedStates({});
    setCheckedIds([]);
  };

  //  count the number of checked items
  const checkedCount = useMemo(() => checkedIds.length, [checkedIds]);

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
