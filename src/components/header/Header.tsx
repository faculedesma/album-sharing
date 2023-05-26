import styled from 'styled-components/native'
import { Link } from 'expo-router'
import { View } from 'react-native-animatable'

interface Props {
  text: string
}

export default function Header({ text }: Props) {
  return (
    <S.Wrapper testID="header">
    </S.Header>
    <S.Header testID="header">
    </S.Wrapper>
  )
}

const S = {
  Header: styled(Link)`
    height: '100px',
    padding: ${p => p.theme.dimensions(10, 'px')} ${p => p.theme.dimensions(20, 'px')};
    border-color: ${p => p.theme.highlight};
    border-width: ${p => p.theme.dimensions(1, 'px')};
    border-radius: ${p => p.theme.dimensions(5, 'px')};
    background-color: transparent;
  `,
  HeaderLogo: styled.Text`
    color: ${p => p.theme.highlight};
    font-weight: 600;
  `,
  HeaderUser: styled.Text`
    color: ${p => p.theme.highlight};
    font-weight: 600;
  `,
}
