
import ProductCard from "../componants/poduct";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:8000/product/allproduct");

        if (response.status === 200) {
          setData(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        console.error("Error details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-5 gap-4 p-4">
        {data.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;