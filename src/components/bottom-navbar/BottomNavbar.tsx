import styled from "styled-components/native";
import { Home } from "src/assets/svgs/Home";
import { Group } from "src/assets/svgs/Group";
import { Heart } from "src/assets/svgs/Heart";
import { usePathname } from "expo-router";
import { ReactElement } from "react";
import { Link } from "expo-router";
import { GenericText } from "../text/GenericText";
import { BlurView } from "expo-blur";
import { View } from "react-native-animatable";

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
    <S.BottomContainer
      animation="slideInUp"
      easing="ease-in-cubic"
      duration={1000}
    >
      <S.BottomNavbar testID="bottom-navbar" intensity={10} tint="light">
        {navLinks.map((link) => {
          return <BottomNavbarLink key={link.id} link={link} />;
        })}
      </S.BottomNavbar>
    </S.BottomContainer>
  );
};

export default BottomNavbar;

const S = {
  BottomContainer: styled(View)`
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: 80px;
  `,
  BottomNavbar: styled(BlurView)`
    border-width: 0.5px;
    border-color: ${(p) => p.theme.shades200};
    border-radius: 8px;
    overflow: hidden;
    background: rgba(${(p) => p.theme.highlight}, 0.5);
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  `,
  LinkContainer: styled.View`
    height: 100%;
    align-items: center;
    justify-content: center;
  `,
  Link: styled(Link)``,
};
