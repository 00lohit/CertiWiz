"use client";

import { Search } from "../NavMenu/Search";
import { Add } from "../NavMenu/Add";
import Acess from "./Content/Acess";
import Type from "./Content/Type";

export interface ContentType {
  data: {} | null;
  pathname: string | null;
}

export const Contnet = ({ pathname, data }: ContentType) => {
  return (
    <div className="flex flex-1 items-center">
      <Acess {...{ pathname, data }} />
      <Type {...{ pathname, data }} />
      <Search />
      <Add />
    </div>
  );
};
