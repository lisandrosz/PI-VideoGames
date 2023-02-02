import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url("https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbWVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  opacity: 0.8;
  width: 100%;
  height: 100vh;
`;

export const BotonIngresar = styled.button`
  margin-top: 50px;
  font-size: 1.2em;
  color: white;
  background-color: #212121;
  width: fit-content;
  height: 2em;
  border-radius: 5px;
  transition: transform 0.5s;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.75);

  &:hover {
    transform: scale(1.2);
  }
`;

export const H1 = styled.h1`
  color: white;
`;
