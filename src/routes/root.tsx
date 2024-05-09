import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex gap-5 h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <ul>
          <li className="text-blue-500">
            <a href="/">Home</a>
          </li>
          <li className="text-blue-500">
            <a href="/cart">Cart</a>
          </li>
        </ul>
      </div>
      <div className="w-3/4">
        <Outlet />
      </div>
    </div>
  );
}
