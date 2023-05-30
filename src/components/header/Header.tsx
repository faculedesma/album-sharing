import { useState } from "react";
import styled from "styled-components/native";
import { Search } from "src/assets/svgs/Search";
import { Logo } from "src/assets/svgs/Logo";
import { Modal, TouchableOpacity } from "react-native";
import Profile from "../profile/Profile";

const Header = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  return (
    <S.Header>
      <S.HeaderLeft>
        <Logo />
      </S.HeaderLeft>
      <S.HeaderRight>
        <Search />
        <TouchableOpacity onPress={openModal}>
          <S.Profile></S.Profile>
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
  ProfileContainer: styled.Button``,
  Profile: styled.View`
    height: 30px;
    width: 30px;
    background-color: ${(p) => p.theme.highlight}
    border-radius: 50%;
  `,
};
