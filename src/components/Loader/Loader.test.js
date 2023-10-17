import { Loader } from ".";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';


describe('Loader', () => {
    render(<Loader />)
    const loader = screen.getByTestId(/loader/i)
    it('Loader renders', () => {
        expect(loader).toBeInTheDocument();
    })
    it('Loader has class loader', () => {
        expect(loader).toHaveClass('loader')
    })
})