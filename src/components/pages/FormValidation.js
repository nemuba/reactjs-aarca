import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { FormGroup, Button, Container, FormText, Col, Row } from 'react-bootstrap';
// import { Container } from './styles';

const FormValidation = (props) => {

  const handleSubmit = (values) =>{
    console.log(values);
  }

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            validationSchema={validations}
          >
            <Form className="mt-3">
              <FormGroup>
                <Field
                  className="form-control"
                  name="email"
                  placeholder="E-mail"
                />
                <ErrorMessage
                  component = {FormText}
                  name = "email"
                  className="text-muted"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  className="form-control"
                  name="password"
                  placeholder="Senha"
                />
                <ErrorMessage
                  component = {FormText}
                  name = "password"
                  className="text-muted"
                />
              </FormGroup>
              <Button variant="primary" type="submit">Login</Button>
            </Form>
          </Formik>
        </Col>
      </Row>

    </Container>
  );
};

export default FormValidation;
