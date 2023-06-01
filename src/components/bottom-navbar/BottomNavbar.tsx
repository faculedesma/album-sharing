import styled from "styled-components/native";
import { Home } from "src/assets/svgs/Home";
import { Group } from "src/assets/svgs/Group";
import { Heart } from "src/assets/svgs/Heart";
import { usePathname, useRouter } from "expo-router";
import { ReactElement } from "react";
import { GenericText } from "../text/GenericText";
import { BlurView } from "expo-blur";
import { View } from "react-native-animatable";

const possibilities = ["/home", "/groups", "/liked"];

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
    href: "/home",
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

  const router = useRouter();

  const handlePressLink = (href: string) => router.push(href);

  return (
    <S.LinkContainer
      onPress={() => handlePressLink(link.href)}
      style={{
        opacity: pathname === link.href ? 1 : 0.5,
      }}
    >
      {link.icon}
      <GenericText size={12} weight="light" content={link.label} />
    </S.LinkContainer>
  );
};

const BottomNavbar = () => {
  const pathname = usePathname();

  const shouldDisplayNavbar = () => possibilities.includes(pathname);

  return (
    <S.BottomContainer
      animation="slideInUp"
      easing="ease-in-out"
      duration={500}
      style={{ display: shouldDisplayNavbar() ? "flex" : "none" }}
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
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: 80px;
  `,
  BottomNavbar: styled(BlurView)`
    border-width: 0.5px;
    border-color: ${(p) => p.theme.highlight};
    border-radius: 8px;
    overflow: hidden;
    background: rgba(${(p) => p.theme.highlight}, 0.5);
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  `,
  LinkContainer: styled.Pressable`
    height: 100%;
    width: 100px
    align-items: center;
    justify-content: center;
  `,
};
