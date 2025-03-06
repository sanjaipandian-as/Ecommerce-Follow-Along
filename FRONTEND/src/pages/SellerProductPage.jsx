// import ProductCard from "../components/product";
import ProductCard from "../componants/poduct";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SellerProductPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:8080/product/allproduct");

        console.log("API Response:", response.data); // Debugging response

        if (response.status === 200) {
          setData(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);
 6
  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-5 gap-4 p-4">
        {Array.isArray(data) && data.map((product, index) => (
          <ProductCard key={index} {...product} role={"seller"} />
        ))}
      </div>
    </div>
  );
}
