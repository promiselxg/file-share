import { useState, useEffect } from "react";

const useDuplicateItem = (initialItems) => {
  const [items, setItems] = useState(initialItems);

  // Update items whenever initialItems changes
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const duplicateItem = (id) => {
    setItems((prevItems) => {
      const itemToDuplicate = prevItems.find((item) => item.id === id);

      if (!itemToDuplicate) {
        console.warn("Item not found");
        return prevItems;
      }

      const duplicatedItem = {
        ...itemToDuplicate,
        id: `${itemToDuplicate.id}-duplicate`,
        title: `copy of ${itemToDuplicate.title}`,
      };

      return [duplicatedItem, ...prevItems];
    });
  };

  return { items, duplicateItem };
};

export default useDuplicateItem;
