# Single-Sign-On
A proof-of-concept, MERN stack web application that features single sign-on authentication/authorization. Created for Enterprise Software Platforms (CMPE172) at San Jose State University.

# About
This project utilizes Jenkins for CI/CD, Microsoft's Azure Active Directory as the identity provider, Twitter to practice integrating an API, and a [sample database](https://github.com/datacharmer/test_db).

# Usage
Create and populate a .env file using sample.env as a template, then place this file in ./server. Generate a cert.pem and key.pem file (for https) and place these files in ./server. .gitignore should ignore these files, but in general these files should not be public.
