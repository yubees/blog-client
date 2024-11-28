import { Outlet } from "react-router-dom";

const CenterLayout = () => {
  return (
    <div className="flex items-center justify-center w-[100vw]">
      <Outlet />
    </div>
  );
};

export default CenterLayout;
