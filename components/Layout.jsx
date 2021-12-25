import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="ml-14">{props.children}</main>
    </div>
  );
};

export default Layout;
