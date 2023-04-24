import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe('Header Component', () => {
    test('checking if home is exist or not', () => {
        //Arrange
        render(<Header/>)

        //Act
        //nothing 

        //Assert
        const homeElement = screen.getByText('Home')
        expect(homeElement).toBeInTheDocument()
    })
})