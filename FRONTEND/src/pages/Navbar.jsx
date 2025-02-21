import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import { MdOutlineAddBox } from "react-icons/md";

function Navbar() {
  return (
    <ul className="absolute top-0 right-[200px] p-4">
      <li className="inline-block mr-4 mt-10">
        <Link
          to="/"
          className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center"
        >
          <IoHome className="mr-2" />
          Home
        </Link>
      </li>
      <li className="inline-block mr-4 mt-10">
        <Link
          to="/Createpage"
          className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center"
        >
          <MdOutlineAddBox className="mr-2" />
          Create
        </Link>
      </li>
      <li className="inline-block">
        <Link
          to="/login"
          className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center"
        >
          <TbLogin2 className="mr-2" />
          Login
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
