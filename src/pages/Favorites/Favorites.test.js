import { Favorites } from "./Favorites";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector } from 'react-redux'

jest.mock('react-redux')

const info = () => <div data-testid="info"></div>
// мок при дефолтном экспорте
jest.mock('../../components/Info', () => info);
// мок при экспорте именованном
const goods = () => <div data-testid="goods"></div>
jest.mock('../../components/Goods', () => ({ Goods: () => goods }))

describe('Favorites', () => {
    it('should renders Loading if status === "loading"', () => {
        useSelector.mockReturnValue({ status: 'loading' })
        render(<Favorites />)
        const loader = screen.getByTestId('loader')
        expect(loader).toBeInTheDocument()
    })
    it('should render message error if error is not empty', () => {
        useSelector.mockReturnValue({ error: "someError" })
        render(<Favorites />)
        expect(screen.getByText(/Error:/i)).toBeInTheDocument()
    })
    it('should render message error && Loader if got error && status "loading"', () => {
        useSelector.mockReturnValue({ status: 'loading', error: "someError" })
        render(<Favorites />)
        expect(screen.getByText(/Error:/i)).toBeInTheDocument()
        expect(screen.getByText(/someerror/i)).toBeInTheDocument()
        expect(screen.getByTestId('loader')).toBeInTheDocument()
        expect(screen.getByTestId('loader')).toHaveClass('loader')
    })
    it('should render Info if !error && status"resolved" && favorites && favorites.length < 1', () => {
        useSelector.mockReturnValue({
            status: 'resolved',
            list: []
        })
        render(<Favorites />)
        expect(screen.getByTestId('info')).toBeInTheDocument();
    })
    it('should not render Info if error', () => {
        useSelector.mockReturnValue({
            error: 'someerror',
            list: [],
            status: 'resolved'
        })
        render(<Favorites />)
        expect(screen.queryByTestId('info')).not.toBeInTheDocument();
    })
    it('should not render Info if status !== "resolved"', () => {
        useSelector.mockReturnValue({
            status: 'rejected',
            error: null,
            list: []
        })
        render(<Favorites />)
        expect(screen.queryByTestId('info')).not.toBeInTheDocument();
    })

    it('should not render Info if favorites not empty', async () => {
        // & should render Goods in this case
        useSelector.mockReturnValue({
            status: 'resolved',
            error: null,
            list: [1, 2, 3]
        })
        render(<Favorites />)
        expect(screen.queryByTestId('info')).not.toBeInTheDocument();
        expect(screen.queryByTestId('goods')).not.toBeInTheDocument();
        
    })
})
