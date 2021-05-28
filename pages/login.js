import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Link,
  Stack,
} from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (value.toLowerCase().length < 3) {
      error = "too short";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.toLowerCase().length < 3) {
      error = "too short";
    }
    return error;
  }

  const handleLogin = async (values, action) => {
    const { email, password } = values;
    const response = await fetch("./api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      let description = await response
        .json()
        .then((data) => data.error.description);
      setError(description);
      return;
    }

    return response;
  };

  return (
    <>
      <Flex justifyContent="center" py={10}>
        <Box w="30%" mt={12}>
          <Box mb={3}>{error && <Text color="red.500">{error}</Text>}</Box>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
          >
            {(formProps) => (
              <Form>
                <Stack spacing={4}>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        id="email"
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" variant="filled" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        id="password"
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" variant="filled" />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    mt={4}
                    colorScheme="blue"
                    isLoading={formProps.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Center mt="4">
            <Link to="/signup">Signup</Link>
          </Center>
        </Box>
      </Flex>
    </>
  );
}
