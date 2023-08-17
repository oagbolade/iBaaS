import { render, screen } from '@testing-library/react'
import {LoginBannerText} from '@/features/Login'
import '@testing-library/jest-dom'
 
describe('Test Login Banner', () => {
  it('renders a heading', () => {
    render(<LoginBannerText />)
 
    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })
 
    expect(heading).toBeInTheDocument()
  })
})