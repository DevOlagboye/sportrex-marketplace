import React, { useState } from "react";
import ProfileSelect from "../../Select/ProfileSelect";
import Collections from "./Collections";
import NftAsset from "./NftAsset";
import OwnedByMe from "../Collections/OwnedByMe";
import { CollectionResult } from "@/types";
import SingleCollectionCard from "../Collections/SingleCollectionCard";
const getFavoritesCollection = () => {
  if (typeof window !== "undefined") {
    // Check if 'favorites' exists in localStorage
    const favorites = localStorage.getItem("favoritesCollection");
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
};
const Favourite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const favorites = getFavoritesCollection();

  const [active, setActive] = useState(1);
  const [selected, setSelected] = useState({
    value: "Collections",
    label: "Collections",
    id: 1,
  });
  const data = [
    {
      value: "Collections",
      label: "Collections",
      id: 1,
    },
    {
      value: "NftAsset by me",
      label: "NftAsset by me",
      id: 2,
    },

  ];

  

  return (
    <div className="bg-blue-body w-full h-full">
      <div className="mt-3 w-64">
        <ProfileSelect
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setActive={setActive}
          active={active}
          data={data}
          selected={selected}
          setSelected={setSelected}
          name="Collections"
        />
      </div>
      <div className="mt-6">
        {active === 1 && (
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-3">
            {
              favorites?.map(
              (item: CollectionResult, index: number) => (
                <SingleCollectionCard collection={item} key={index} />
              ))
            }
                
          </div>
        )}
        {active === 2 && <NftAsset />}
      </div>
    </div>
  );
};

export default Favourite;
