import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import { Item } from "../Item/Item";
import { productService } from "../../services/productService";
export const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await productService.getNewCollections();
        setNew_collection(res);
      } catch (error) {
        console.error("Error fetching new collections:", error);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="new-collections">
      <h1>Bộ Sưu Tập Mới</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return <Item key={item._id} product={item} />;
        })}
      </div>
    </div>
  );
};
