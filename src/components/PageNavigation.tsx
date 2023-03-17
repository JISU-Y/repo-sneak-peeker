import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import styled from 'styled-components'
import ChevronLeft from '../icons/ChevronLeft'
import ChevronRight from '../icons/ChevronRight'
import { movePage } from '../redux/reducers/issueReducer'

const PageNavigation = () => {
  const dispatch = useDispatch()
  const { totalPage, page } = useSelector((state: RootState) => state.issueData)
  const [pageNumbers, setPageNumbers] = useState<number[]>([])

  const goPrev = () => dispatch(movePage(page - 1))

  const goNext = () => dispatch(movePage(page + 1))

  const goThatPage = (page) => dispatch(movePage(page))

  useEffect(() => {
    const numbers = new Array(totalPage).fill(1).map((_, index) => index + 1)
    setPageNumbers(numbers)
  }, [totalPage])

  return (
    <PageContainer>
      <ChevronLeft width="0.7rem" height="0.7rem" fill={'black'} onClick={goPrev} />
      <PagesWrapper>
        {Array.from(pageNumbers, (el) => (
          <PageNumberBox key={el}>
            {el === page - 2 && el !== 1 && <Dots>...</Dots>}
            {((el >= page - 1 && el <= page + 1) || el === 1 || el === totalPage) && (
              <PageNumber isActive={page === el} onClick={() => goThatPage(el)}>
                {el}
              </PageNumber>
            )}
            {el === page + 2 && el !== totalPage && <Dots>...</Dots>}
          </PageNumberBox>
        ))}
      </PagesWrapper>
      <ChevronRight width="0.7rem" height="0.7rem" fill={'black'} onClick={goNext} />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  width: 100%;
  background-color: #f6ebff;
  user-select: none;
`

const PagesWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 0 8px;
`

const PageNumberBox = styled.div``

const PageNumber = styled.span<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#00C89D' : 'black')};
`

const Dots = styled.span`
  cursor: default;
`

export default PageNavigation
