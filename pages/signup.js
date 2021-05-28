import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Flex, Link, Stack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");

  function validateName(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (value.toLowerCase().length < 3) {
      error = "too short";
    }
    return error;
  }

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

  const handleSignup = async (values, action) => {
    const { email, password, name } = values;
    const response = await fetch("./api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (response.status !== 200) {
      let description = await response
        .json()
        .then((data) => data.error.description);
      // setError(description);
      return;
    }

    router.push("/");
    return;
  };

  return (
    <>
      <Flex justifyContent="center" py={10}>
        <Box w="30%" mt={12}>
          <Box mb={3}>{error && <Text color="red.500">{error}</Text>}</Box>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSignup}
          >
            {(formProps) => (
              <Form>
                <Stack spacing={3}>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        id="name"
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Name</FormLabel>
                        <Input {...field} type="name" variant="filled" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

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
