import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  padding: 50px 30px;
  background-color: #0f182a;
  flex-direction: column;
  height: 100%;
`;

export const Top = styled.div`
  width: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 0 60px 0;
`;

export const Title = styled.span`
  font-size: 24px;
  color: #e5e7eb;
`;

export const SectionTitle = styled.span`
  font-size: 30px;
  color: #e5e7eb;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Description = styled.span`
  font-size: 16px;
  color: #e5e7eb;
`;

export const UserBox = styled.div`
  font-size: 16px;
  background-color: #141c2f;
  padding: 25px;
  margin: 10px;
  border-radius: 15px;
  color: #000;
  display: flex;
  flex-direction: column;
`;

export const NameBox = styled.p`
  color: #0da5e9;
  font-size: 20px;
  text-align: center;
  margin: 20px 0;
`;

export const Button = styled.button`
  // background-color: #92a3fd;
  // padding: 10px 20px;
  // border-radius: 25px;
  // margin: 10px 0;
`;



export const ButtonText = styled.span`
  font-size: 20px;
  text-align: center;
`;

export const Text = styled.span`
  color: #000;
  font-size: 20px;
  text-align: center;
`;