import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

    const {register, handleSubmit} = useForm()

    const submit = (data) => {
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
        .then(res => {
          console.log(res.data)
          localStorage.setItem("tokenUser", res.data.token)
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
      <Form className='p-5 w-50 mx-auto' style={{border: "2px solid #4582ec", borderRadius: "20px"}} onSubmit={ handleSubmit(submit)}>
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
