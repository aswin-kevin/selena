import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBolt,
  FaCodeBranch,
  FaDiscourse,
  FaShieldVirus,
  FaHatCowboy,
  FaUserAlt,
} from "react-icons/fa";

const SideBar = () => {
  const router = useRouter();
  const elements = [
    { icon: <FaCodeBranch size="25" />, text: "Connector", url: "/home" },
    { icon: <FaBolt size="25" />, text: "OWASP scan", url: "/owasp" },
    { icon: <FaHatCowboy size="25" />, text: "Whois search", url: "/whois" },
    {
      icon: <FaDiscourse size="25" />,
      text: "Port scanner",
      url: "/port-scanner",
    },
    { icon: <FaUserAlt size="25" />, text: "Account", url: "/account" },
  ];

  const normalStyle =
    "relative flex items-center justify-center h-10 w-10 mt-2 mb-2 mx-auto shadow-lg bg-gray-800 text-gray-500 rounded-2xl hover:rounded-xl hover:text-gray-900 hover:bg-gray-500 transition-all duration-300 ease-linear cursor-pointer group";
  const selectedStyle =
    "relative flex items-center justify-center h-10 w-10 mt-2 mb-2 mx-auto shadow-lg bg-gray-500 text-gray-900 rounded-xl";

  return (
    <div className="fixed top-0 left-0 h-screen w-14 m-0 flex flex-col bg-gray-900 text-white">
      <div
        key={Math.random().toString()}
        className="relative flex items-center justify-center h-10 w-10 mt-2 mb-2 mx-auto shadow-lg text-green-800"
      >
        <FaShieldVirus size="28" />
      </div>
      {elements.map((_val) => (
        <Link href={_val.url}>
          <div
            key={_val.text}
            className={
              router.pathname == _val.url ? selectedStyle : normalStyle
            }
          >
            {_val.icon}
            <span className="absolute w-auto p-2 m-2 min-w-max left-12 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
              {_val.text}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
