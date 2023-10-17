import { SearchBar } from '.'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Store } from "../../context/Store";
import userEvent from '@testing-library/user-event';


describe('SearchBar component', () => {
    const handleSearchChange = jest.fn()
    const searchValue = 'testvalue'
    beforeEach(() => {
        render(<SearchBar />,
            {
                wrapper: ({ children }) => (<Store.Provider
                    value={{ handleSearchChange, searchValue }}
                >{children}</Store.Provider>)
            });

    })

    it('SearchBar renders', () => {
        const searchInput = screen.getByPlaceholderText('Search ...');
        expect(searchInput).toBeInTheDocument()
    })


    it('calls handleSearchChange on input change', () => {
        const searchInput = screen.getByPlaceholderText('Search ...');
        userEvent.type(searchInput, 'example');
        expect(handleSearchChange).toHaveBeenCalledTimes(7);
    })

    it('SearchBar has right initial value', () => {
        const searchInput = screen.getByPlaceholderText('Search ...');
        expect(searchInput).toHaveValue('testvalue')
    })

    it('search input field to have focus on render', async () => {
        const searchInput = screen.getByPlaceholderText('Search ...');
        userEvent.click(searchInput)
        expect(searchInput).toHaveFocus()
    })

    it('div contaier has class', () => {
        const divContainer = screen.getByTestId('div');
        expect(divContainer).toHaveClass('goods__searchBlock')
    })

})