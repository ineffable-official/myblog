import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Category(props) {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategory = useCallback(() => {
    setLoading(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/wp/v2/categories/" +
          props.category_id
      )
      .then((res) => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [props]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <div className="py-1 px-2 bg-blue-500 rounded-md text-xs text-white">
      {!loading ? (
        category.name
      ) : (
        <div className="w-4 h-4 flex items-center justify-center animate-spin">
          <i className="fa-light fa-spinner"></i>
        </div>
      )}
    </div>
  );
}
