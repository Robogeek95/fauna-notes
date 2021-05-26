import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Grid, Stack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

export default function Login() {
  const router = useRouter();

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

  function submit(values, actions) {
    setTimeout(() => {
      actions.setSubmitting(false);
      router.push("/");
    }, 1000);
  }

  return (
    <>
      <Flex justifyContent="center" py={10}>
        <Box w="30%" mt={12}>
          <Formik initialValues={{ email: "", password: "" }} onSubmit={submit}>
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
        </Box>
      </Flex>
    </>
  );
}
