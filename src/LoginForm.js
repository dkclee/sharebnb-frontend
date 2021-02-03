import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form,Button} from 'react-bootstrap';

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
    <div>
      <h2>Login!</h2>

      <Form inline onSubmit={handleSubmit}>
        <Form.Label htmlFor="LoginForm-username" srOnly>
          Username
        </Form.Label>
        <Form.Control
          className="mb-2 mr-sm-2"
          id="LoginForm-username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          />
        <Form.Label htmlFor="LoginForm-password" srOnly>
          Password
        </Form.Label>
        <Form.Control
          className="mb-2 mr-sm-2"
          id="LoginForm-password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          />
        <Button type="submit" className="mb-2">
          Submit
        </Button>
      </Form>
    </div>


  );
}
export default LoginForm;