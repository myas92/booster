# Reacaptha v2
Useful tutorial in [Youtube](https://www.youtube.com/watch?v=vrbyaOoZ-4Q)

### Create a captcha from blow link:

https://google.com/recaptcha/admin/create

For localhost:

Domain field : `localhost` 

[sample](chrome-extension://fdpohaocaechififmbbbbbknoalclacl/capture.html?id=1&url=https%3A%2F%2Fwww.google.com%2Frecaptcha%2Fadmin%2Fsite%2F535935589%2Fsettings)

### Client

For `React` 
```
npm install react-google-recaptcha
```
Create a new Component
```javascript
import ReCAPTCHA from "react-google-recaptcha";
import React, { Component } from 'react'
import { Button, Form } from "react-bootstrap";

export class Captcha extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
    };
  }
  onChange = (value) => {
    console.log("Captcha value:", value);
    this.setState({
      verified: true
    })
  };
  handleSubmit = event => {
    // Send Request
  }

  render() {
    return (
      <section id="contact" name="#contact">
        <Form id="contact-form-bottom" onSubmit={this.handleSubmit}>
          <ReCAPTCHA
            className="g-recaptcha"
            sitekey="First Field"
            onChange={this.onChange}
            theme="dark"
          />
          <Button id="submit" variant="primary" type="submit">Submit</Button>
        </Form>
      </section>
    )
  }
}
export default Captcha
```
### Server
Send a request to blow link
```
https://www.google.com/recaptcha/api/siteverify?secret={second_field}&response=${generated_token_in_client}
```

Success response
```javascript
{
    "success": true,
    "challenge_ts": "2022-05-16T07:29:41Z",
    "hostname": "localhost"
}
```
Error response
```javascript
{
    "success": false,
    "error-codes": [
        "timeout-or-duplicate"
    ]
}
//or
{
    "success": false,
    "error-codes": [
        "invalid-input-response"
    ]
}
```
