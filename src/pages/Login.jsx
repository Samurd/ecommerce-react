import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function Login() {
  const navigate = useNavigate();

    const {register, handleSubmit} = useForm()

    const submit = (data) => {
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
        .then(res => {
          console.log(res.data)
          localStorage.setItem("tokenUser", res.data.token)
          localStorage.setItem("user", res.data.user.id)
          navigate("/")
        })
        .catch(error => {
          if(error.response.status === 401) {
            alert("Credenciales incorrectas");
          }
        })
    }


  return (
    <div className='mt-5'>
      <Form className='p-5 mx-auto' style={{border: "2px solid #2c3e50", borderRadius: "20px", width: "90%", maxWidth: "500px"}} onSubmit={ handleSubmit(submit)}>
      <Alert variant='primary'>
        <p className='m-0'>Test:</p>
        <p className='m-0'>Email: samurr@gmail.com </p>
        <p className='m-0'>password: 1234</p>
          
        </Alert>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
            <Form.Control type="email" placeholder="Email" {...register("email")} />
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
            <Form.Control type="password" placeholder="Password" {...register("password")} />
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Button type="submit">Sign in</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
