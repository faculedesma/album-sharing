import styled from "styled-components/native";
import { Home } from "src/assets/svgs/Home";
import { Group } from "src/assets/svgs/Group";
import { Heart } from "src/assets/svgs/Heart";
import { usePathname } from "expo-router";
import { ReactElement } from "react";
import { Link } from "expo-router";
import { GenericText } from "../text/GenericText";

interface INavLink {
  id: string;
  label: string;
  href: string;
  icon: ReactElement;
}

interface INavLinkProps {
  link: INavLink;
}

const navLinks = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    id: "groups",
    label: "Groups",
    href: "/groups",
    icon: <Group />,
  },
  {
    id: "liked",
    label: "Liked",
    href: "/liked",
    icon: <Heart />,
  },
];

const BottomNavbarLink = ({ link }: INavLinkProps) => {
  const pathname = usePathname();

  return (
    <S.LinkContainer>
      <S.Link
        style={{ opacity: pathname === link.href ? 1 : 0.5 }}
        href={link.href}
      >
        {link.icon}
      </S.Link>
      <GenericText size={12} weight="light" content={link.label} />
    </S.LinkContainer>
  );
};

const BottomNavbar = () => {
  return (
    <S.BottomNavbar testID="bottom-navbar">
      {navLinks.map((link) => {
        return <BottomNavbarLink key={link.id} link={link} />;
      })}
    </S.BottomNavbar>
  );
};

export default BottomNavbar;

const S = {
  BottomNavbar: styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${(p) => p.theme.dimensions(90, "px")};
    width: ${(p) => p.theme.windowWidth};
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    border-width: ${(p) => p.theme.dimensions(0.5, "px")};
    border-top-color: ${(p) => p.theme.shades200};
    margin-top: ${(p) => p.theme.dimensions(24, "px")};
    padding-top: ${(p) => p.theme.dimensions(8, "px")};
  `,
  LinkContainer: styled.View`
    height: ${(p) => p.theme.dimensions(40, "px")};
    align-items: center;
    justify-content: space-between;
  `,
  Link: styled(Link)``,
};
