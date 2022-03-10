import { fireEvent, queryByTitle, render } from '@testing-library/react';
import Register from './Register';

describe("Login button",()=>{
    it("login button render",()=>{
        let {queryByTitle} =render(<Register/>)
        let btn = queryByTitle("RegBtn")
        expect(btn).toBeTruthy()
    })

    it("onSubmit",()=>{
        let {queryByTitle} = render(<Register/>)
        let btn = queryByTitle("RegBtn")
        fireEvent.submit(btn)   
    })
})


describe("input field test",()=>{
    it("Reg render",()=>{
        let {queryByTitle}=render (<Register/>)
        let input = queryByTitle("Regname")
        expect(input).toBeTruthy()
    })
    it("input onChange",()=>{
        let {queryByTitle}=render (<Register/>)
        let input = queryByTitle("Regname")
        fireEvent.change(input,{target:{value:"testValue"}})
        expect(input.value).toBe("testValue")
    })
})


describe("reg email  field testt" ,()=>{
    it("Reg render",()=>{
        let {queryByTitle}=render (<Register/>)
        let input = queryByTitle("Regemail")
        expect(input).toBeTruthy()
    })
    it("input onChange",()=>{
        let {queryByTitle}=render (<Register/>)
        let input = queryByTitle("Regemail")
        fireEvent.change(input,{target:{value:"testValue"}})
        expect(input.value).toBe("testValue")
    })
})


describe("reg pass field test",()=>{
    it("login render",()=>{
        let {queryByTitle}=render (<Register/>)
        let input = queryByTitle("Regpass")
        expect(input).toBeTruthy()
    })
    it("input onChange",()=>{
        let {queryByTitle}=render (<Register/>)
        let input = queryByTitle("Regpass")
        fireEvent.change(input,{target:{value:"testValue"}})
        expect(input.value).toBe("testValue")
    })
})