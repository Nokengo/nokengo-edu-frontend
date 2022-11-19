import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  padding: 50px 30px;
  background-color: #fff;
  flex-direction: column;
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
  color: #000;
`;

export const SectionTitle = styled.span`
  font-size: 30px;
  color: #000;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Description = styled.span`
  font-size: 16px;
  color: #000;
`;

export const UserBox = styled.div`
  font-size: 16px;
  background-color: #f7f8f8;
  padding: 25px;
  margin: 10px;
  border-radius: 15px;
  color: #000;
  display: flex;
  flex-direction: column;
`;

export const NameBox = styled.p`
  color: #000;
  font-size: 20px;
  text-align: center;
  margin: 20px 0;
`;

export const Button = styled.button`
  background-color: #92a3fd;
  padding: 10px 20px;
  border-radius: 25px;
  width: 100%;
  margin: 10px 0;
`;



export const ButtonText = styled.span`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export const Text = styled.span`
  color: #000;
  font-size: 20px;
  text-align: center;
`;