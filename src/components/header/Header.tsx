import { useState } from "react";
import styled from "styled-components/native";
import { Search } from "src/assets/svgs/Search";
import { Modal, TouchableOpacity } from "react-native";
import Profile from "../profile/Profile";
import { usePathname } from "expo-router";
import LogoPNG from "src/assets/images/logo.png";

const Header = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const pathname = usePathname();

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  return (
    <S.Header>
      <S.HeaderLeft>
        <S.LogoImage source={LogoPNG}></S.LogoImage>
      </S.HeaderLeft>
      <S.HeaderRight>
        <Search />
        <TouchableOpacity onPress={openModal}>
          <S.ProfileAvatar
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AOLn63FR1yAhWwMPVOxnKxNWJktQRftStxUNo2MUBx_RYg=s64-c-mo",
            }}
          ></S.ProfileAvatar>
        </TouchableOpacity>
      </S.HeaderRight>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <Profile closeModal={closeModal} />
      </Modal>
    </S.Header>
  );
};

export default Header;

const S = {
  Header: styled.View`
    height: 40px;
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 20px;
  `,
  HeaderRight: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  `,
  HeaderLeft: styled.View`
    height: 30px;
    width: 30px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `,
  LogoImage: styled.ImageBackground`
    height: 20px;
    width: 25px;
    align-self: center;
  `,
  ProfileContainer: styled.Button``,
  ProfileAvatar: styled.ImageBackground`
    height: 30px;
    width: 30px;
    background-color: ${(p) => p.theme.shades50}
    border: .5px ${(p) => p.theme.highlight}
    border-radius: 50%;
    overflow: hidden;
  `,
};
