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
  align-items: center;
  display: flex;
  flex-direction: column;
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

export const TextInput = styled.input`
  font-size: 16px;
  height: 40px;
  background-color: #f7f8f8;
  padding: 25px;
  margin: 10px;
  border-radius: 15px;
  width: 100%;
  color: #000;
`;

export const Button = styled.button`
  background-color: #92a3fd;
  padding: 10px 20px;
  border-radius: 25px;
  width: 100%;
`;

export const SmallButton = styled.button`
  background-color: transparent;
  flex-direction: row;
`;

export const ButtonText = styled.span`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export const SmallButtonText = styled.span`
  color: #c58bf2;
  font-size: 20px;
  text-align: center;
  margin-left: 5px;
`;

export const Text = styled.span`
  color: #000;
  font-size: 20px;
  text-align: center;
`;

export const Select = styled.select`
  font-size: 16px;
  height: 50px;
  background-color: #f7f8f8;
  padding: 10px 25px;
  margin: 10px;
  border-radius: 15px;
  width: 100%;
  color: #000;
`;