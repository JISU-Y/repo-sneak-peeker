import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const ContentBox = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  border-radius: 4px;
  background-color: #f6ebff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: default;
  &:hover {
    transform: translateY(-5px);
  }
`

export const Tag = styled.div`
  padding: 4px 8px;
  background-color: #00c89d;
  width: fit-content;
  border-radius: 4px;
  color: white;
  cursor: default;
`

export const loadingAnimation = css`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #ddd, #eee, #ddd);
    animation: loading 1.5s infinite linear;
  }

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(440px);
    }
  }
`

export const GrayBox = styled.div`
  width: 150px;
  height: 20px;
  background-color: lightgray;
  position: relative;
  overflow: hidden;

  ${loadingAnimation}
`
