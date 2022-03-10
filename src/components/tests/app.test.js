import { fireEvent, queryByAttribute, render } from "@testing-library/react";
import Loginpage from "../Loginpage";

describe("loginpage", () => {
  it("Ok, Login is successful", async () => {
    const utils = render(<Loginpage />);
    const getById = queryByAttribute.bind(null, "id");
    const input = getById(utils.container, "Login");
    fireEvent.click(input);
    // fireEvent.change(input, {target: value : ""});
  });
});
