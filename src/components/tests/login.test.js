import { fireEvent, queryByTitle, render } from '@testing-library/react';
import loginpage from './Loginpage';

describe("Login button",()=>{
    it("login button render",()=>{
        let {queryByTitle} =render(<Login/>)
        let btn = screen.queryByTitle("loginBtn")
        expect(btn).toBeTruthy()
    })

    it("onSubmit",()=>{
        let {queryByTitle} = render(<Login/>)
        let btn = screen.queryByTitle("loginBtn")
        fireEvent.submit(btn)   
    })
})


describe("input field test",()=>{
    it("login render",()=>{
        let {queryByTitle}=render (<Login/>)
        let input = screen.queryByTitle("loginemail")
        expect(input).toBeTruthy()
    })
    it("input onChange",()=>{
        let {queryByTitle}=render (<Login />)
        let input = screen.queryByTitle("loginemail")
        fireEvent.change(input,{target:{value:"testValue"}})
        expect(input.value).toBe("testValue")
    })
})


describe("input field test",()=>{
    it("login render",()=>{
        let {queryByTitle}=render (<Login/>)
        let input = screen.queryByTitle("loginpass")
        expect(input).toBeTruthy()
    })
    it("input onChange",()=>{
        let {queryByTitle}=render (<Login />)
        let input = screen.queryByTitle("loginpass")
        fireEvent.change(input,{target:{value:"testValue"}})
        expect(input.value).toBe("testValue")
    })
})